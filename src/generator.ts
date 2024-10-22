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
  async injector(name?: string) {
    this.swagger = await this.load()
    this.swagger.models.forEach((prop) => {
      console.log(prop)
    })
  }

  /**
   * swaggerの情報からschema生成する
   */
  async gateways(name?: string) {
    this.swagger = await this.load()
    for (const model of this.swagger.models) {
      if (model.ClassName && (!name || (name && model.ClassName === upperCamel(name)))) {
        this.classname = model.ClassName
        // await this.update('app/schemas/gateways/AppName', app.gateways)
        await this.update('app/infrastructure', app.infrastructure)
      }
    }
  }
}
