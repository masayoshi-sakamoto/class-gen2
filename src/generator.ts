import * as fs from 'fs'
import { IOptions } from './options'
import Base from './base'
import { app, swagger } from './types'
import { upperCamel } from './common'
import { isCamelCase } from './lib/snake-camel'

export default class Generator extends Base {
  constructor(protected options: IOptions) {
    super(options)
  }

  async injector() {
    this.swagger = await this.load()
    await this.generate('index/app', app.root)
  }

  async gateways(name?: string) {
    this.swagger = await this.load()
    const regex = /Request|Response/
    const camelCasePattern = /^[a-z]+([A-Z][a-z]*)*$/
    for (const model of this.swagger.models) {
      if (model.ClassName && (!name || (name && model.ClassName === upperCamel(name)))) {
        if ((!isCamelCase(model.ClassName) && model.refs?.length) || 0 > 0) {
          this.classname = model.ClassName
          await this.update(app.translator, app.translator)
        }
      }
    }
    for (const tag in this.swagger.paths) {
      if (tag && (!name || (name && tag === upperCamel(name)))) {
        this.tag = tag
        await this.update(app.gateways, app.gateways)
      }
    }
  }

  async infrastructure(name?: string) {
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
    this.injector()
  }
}
