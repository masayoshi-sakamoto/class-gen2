import * as fs from 'fs'
import { IOptions } from './options'
import Base from './base'
import { app, swagger } from './types'
import { upperCamel } from './common'

export default class Generator extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  /**
   * swaggerの情報からschema生成する
   */
  async injector() {
    this.swagger = await this.load()
    await this.generate('index/app', app.root)
  }

  /**
   * swaggerの情報からschema生成する
   */
  async gateways(name?: string) {
    this.swagger = await this.load()
    for (const model of this.swagger.models) {
      if (model.ClassName && (!name || (name && model.ClassName === upperCamel(name)))) {
        this.classname = model.ClassName
        await this.update(app.models, app.models)
      }
    }
    for (const tag in this.swagger.paths) {
      if (tag && (!name || (name && tag === upperCamel(name)))) {
        this.tag = tag
        await this.update(app.requests, app.requests)
      }
    }
  }
}
