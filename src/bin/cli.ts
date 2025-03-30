import axios from 'axios'
import * as fs from 'fs'
import * as path from 'path'
import { Command } from 'commander'
import Generator from '../generator'
import { IGenerateOptions } from '../options'

try {
  const pkg = require('../../package.json')
  const program = new Command()

  program
    .version(pkg.version)
    .option('--namespace <namespace>', 'application namespace', 'example')
    .option('--config <filename>', 'application config file name', 'classgen-ts-nuxt.json')
    .option('--json <filename>', 'swagger.yaml directory')
    .option('--dist <path>', 'output directory', './')
    .option('-f, --force', 'forced command')
    .option('-rm, --remove', 'forced command')
    .option('-i, --info', 'displays a confirmation message')

  program
    .command('generate')
    .alias('gen')
    .argument('<command>', 'entities')
    .argument('[name]', 'schema name e.g. user, User, users, Users')
    .argument('[type]', 'gateway connection type. only usecase')
    .option('-e, --excludes <excludes>', 'excludes column with sqldump', (items) => items.split(','))
    .option('-sw, --swagger', 'create with swagger file')
    .option('-a, --auth', 'added authentication process')
    .action(async (command: string, name: string, type: string, options: IGenerateOptions) => {
      const generator: any = new Generator({ ...options, global: { ...program.opts() } })
      await generator[command](name)
    })

  program.parse(process.argv)
} catch (e) {
  console.error(e)
  process.exit(2)
}
