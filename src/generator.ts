import * as fs from 'fs'
import { IOptions } from './options'
import Base from './base'
import { app, swagger } from './types'
import { upperCamel, isCamelCase } from './common'

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
    for (const model of this.swagger.models) {
      if (model.ClassName && (!name || (name && model.ClassName === upperCamel(name)))) {
        if (!isCamelCase(model.ClassName) && model.schema) {
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
    this.injector()
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

  async entities(name?: string) {
    this.swagger = await this.load()
    for (const model of this.swagger.models) {
      if (model.ClassName && (!name || (name && model.ClassName === upperCamel(name)))) {
        if (!isCamelCase(model.ClassName) && model.schema) {
          this.classname = model.ClassName
          await this.update(app.entities, app.entities)
        }
      }
    }
    this.injector()
  }

  async usecases(name?: string) {
    this.swagger = await this.load()

    for (const [tag, paths] of Object.entries(this.swagger.paths) as any) {
      if (tag && (!name || (name && tag === upperCamel(name)))) {
        if (this.configs.usecases?.excludes?.includes(tag)) {
          this.classname = tag
          for (const path of Object.values(paths) as any) {
            this.operationId = upperCamel(path.operationId)
            this.path = path
            await this.update('index/' + app.usecases, app.usecases, this.operationId + 'UseCase.ts')
          }
        }
      }
    }

    for (const [tag, paths] of Object.entries(this.swagger.paths) as any) {
      if (tag && (!name || (name && tag === upperCamel(name)))) {
        if (!this.configs.usecases?.excludes?.includes(tag)) {
          this.classname = tag
          for (const path of Object.values(paths) as any) {
            const operationId = upperCamel(path.operationId)
            const filename = operationId === 'Post' + tag ? 'Save' + tag : operationId
            await this.update(app.usecases, app.usecases, filename + 'UseCase.ts')
          }
        }
      }
    }
    this.injector()
  }

  async repositories(name?: string) {
    this.swagger = await this.load()
    const models = this.swagger.models.filter((model) => !this.configs.repositories!.excludes?.includes(model.ClassName!))
    for (const model of models) {
      if (model.ClassName && (!name || (name && model.ClassName === upperCamel(name)))) {
        if (!isCamelCase(model.ClassName) && model.schema) {
          this.classname = model.ClassName
          await this.update(app.repositories, app.repositories)
          await this.update(app.store, app.store)
        }
      }
    }
    this.injector()
  }
}
