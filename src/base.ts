import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'
import * as ejs from 'ejs'
import * as chalk from 'chalk'
import * as prettier from 'prettier'

import { snake, kabab, upperCamel, lowerCamel, resolve, replaces, error } from './common'
import { IOptions } from './options'
import OpenAPIParser from './openapi'
import { EmptyConfig, IConfig, swagger, app, exts, ITsSchema } from './types'

const readlineSync = require('readline-sync')

export default class Base {
  protected src: string
  protected dist: string
  protected classname: string = 'user'
  protected tag: string = ''
  protected swagger: { paths: any; models: ITsSchema[] } = { paths: {}, models: [] }
  protected sqldump?: any
  protected configs: IConfig
  protected type?: string

  constructor(protected opts: IOptions) {
    // ネームスペースがない場合は処理を終了
    if (!this.opts.global.namespace) {
      error('namespace is required. Please specify with --namespace option.')
    }

    // テンプレートの読み込み先と、出力先を設定
    this.src = path.resolve(__dirname, '../templates/')
    this.dist = path.resolve(process.cwd(), this.opts.global.dist)

    resolve(this.dist)

    // 設定ファイルを読み込み
    const configpath = path.resolve(process.cwd(), this.opts.global.config)

    // コンフィグの初期化
    const configs: IConfig = fs.existsSync(configpath) ? JSON.parse(fs.readFileSync(configpath, 'utf-8')) : {}
    this.configs = EmptyConfig(configs)
  }

  /**
   * 削除フラグがあったら削除、なければ作成
   */
  protected async update(src: string, dist: string, match?: string) {
    if (this.opts.global.remove) {
      await this.remove(src, dist, false, match)
    } else {
      await this.generate(src, dist, false, match)
    }
  }

  /**
   * 指定されたフォルダの中をレンダリングする
   */
  protected async generate(src: string, dist: string, silent: boolean = false, match?: string) {
    await this.readdir(path.join(this.src, src), path.join(this.dist, dist), 'render', silent, match)
  }

  /**
   * 指定されたフォルダの中を削除
   */
  protected async remove(src: string, dist: string, silent: boolean = false, match?: string) {
    await this.readdir(path.join(this.src, src), path.join(this.dist, dist), 'rm', silent, match)
  }

  /**
   * 指定されたsrcに基づいて、distにディレクトリとファイルを生成と削除
   * methodを指定することで、そのファイルに対してなにをするかを指定出来る
   */
  protected async readdir(src: string, dist: string, method: string, silent: boolean = false, match?: string) {
    if (fs.existsSync(src)) {
      const files = fs.readdirSync(src, { withFileTypes: true })
      dist = replaces(dist, this.replace())
      for (const file of files) {
        const name = resolve(dist, replaces(file.name, this.replace()))
        if (file.isDirectory()) {
          await this.readdir(path.join(src, file.name), name, method, silent)
          if (method === 'rm' && fs.readdirSync(name).length === 0) {
            fs.rmdirSync(name)
          }
        } else {
          if (!match || (match && name.match(new RegExp(`(.*)\/${match}`)))) {
            await (this as any)[method](path.join(src, file.name), name, silent)
          }
        }
      }
    }
  }

  /**
   * EJSを使ってテンプレートファイルからファイルを生成
   */
  protected async render(src: string, dist: string, silent: boolean = false) {
    const opts = {
      ...this.replace(),
      swagger,
      app,
      type: this.type,
      readfiles: this.readfiles.bind(this),
      ...this.swagger,
      auth: this.opts.auth,
      configs: this.configs,
      snake,
      kabab,
      upperCamel,
      lowerCamel
    }
    await this.write(dist, ejs.render(fs.readFileSync(src, 'utf-8'), opts), silent)
  }

  /**
   * 生成されたファイルの書き込み
   */
  protected async write(dist: string, content: string, silent: boolean) {
    const exist = fs.existsSync(dist) // 書き出し先が存在しているか
    const ext = path.extname(dist).replace('.', '')

    const text = exts.includes(ext)
      ? await prettier.format(content, {
          parser: ext === 'ts' ? 'typescript' : ext,
          ...(await prettier.resolveConfig(process.cwd()))
        })
      : content

    const name = dist.replace(RegExp(`${this.dist}\/`), '')

    const overwrite =
      !silent /* サイレントが設定されていなく */ &&
      this.opts.global.info /* 確認メッセージが設定されていて */ &&
      exist /* ファルが存在していて */ &&
      !this.opts.global.force /* 強制実行が設定されていなければ */ &&
      readlineSync.keyInYN(`${chalk.yellow('override')} ${name}?`) === true /* かつ上書きがyesの場合 */

    if (!exist || overwrite || this.opts.global.force || silent) {
      fs.writeFileSync(dist, text, { encoding: 'utf-8', flag: 'w+' })
      if (!silent) {
        const msg = exist && this.opts.global.force ? chalk.yellow('Overwrite:') : chalk.green('Generated:')
        console.info(msg, name)
      }
    }
  }

  /**
   * 生成されたファイルの削除
   */
  protected async rm(src: string, dist: string, silent: boolean = false) {
    if (fs.existsSync(dist)) {
      const name = dist.replace(RegExp(`${this.dist}\/`), '')
      if (!this.opts.global.force && readlineSync.keyInYN(`${chalk.red('remove')} ${name}?`) !== true) {
        return
      }
      fs.rmSync(dist)
      if (!silent && this.opts.global.force) {
        console.info(chalk.red('Removed:'), name)
      }
    }
  }
  /**
   * 名前の変換
   */
  protected replace() {
    return {
      appName: lowerCamel(this.opts.global.namespace),
      AppName: upperCamel(this.opts.global.namespace),
      'class-name': kabab(this.classname),
      class_name: snake(this.classname),
      class_names: snake(this.classname, true),
      className: lowerCamel(this.classname),
      classNames: lowerCamel(this.classname, true),
      ClassName: upperCamel(this.classname),
      ClassNames: upperCamel(this.classname, true),
      Tag: upperCamel(this.tag),
      Tags: upperCamel(this.tag, true),
      tag: snake(this.tag),
      tags: snake(this.tag, true)
    }
  }

  /**
   * 指定されたフォルダのファイルリストを取得する
   */
  protected readfiles(src: string, dir: string = '') {
    const name = resolve(this.dist, replaces(src, this.replace()), dir)
    return fs.readdirSync(name, { withFileTypes: true })
  }

  /**
   * swagger.yamlからschemaとパス情報を取得
   */
  protected async load() {
    try {
      if (this.opts.global.json) {
        const response = await axios.get(this.opts.global.json)
        return new OpenAPIParser(response.data).parse()
      }
    } catch (error) {
      console.error(`Error downloading url: ${error}`)
      process.exit()
    }
    return { paths: {}, models: [] }
  }
}
