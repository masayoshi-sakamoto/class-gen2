import { OpenAPIObject, OpenApiBuilder, PathObject, SchemaObject, ReferenceObject, isReferenceObject } from 'openapi3-ts/oas31'
import { IModel, ITsSchema, types } from './types'

export default class OpenAPIParser {
  constructor(protected swagger: OpenAPIObject) {}

  parse() {
    if (this.swagger.paths && this.swagger.components?.schemas) {
      return {
        paths: this.paths(this.swagger.paths),
        models: this.schemas(this.swagger.components.schemas)
      }
    }
    return { paths: {}, models: [] }
  }

  private paths(paths: PathObject): { [key: string]: any } {
    return Object.entries(paths)
      .map(([uri, path]) => {
        return Object.entries(path)
          .map(([method, value]) => {
            return { ...value, method: method.toUpperCase(), uri }
          })
          .reduce((result, prop) => {
            const tags = prop.tags || undefined
            result.push({
              ...prop,
              tags
            })
            return result
          }, [])
      })
      .flat()
      .reduce((result: { [key: string]: any }, prop) => {
        result[prop.tags] = {
          ...result[prop.tags],
          [prop.operationId]: {
            ...prop,
            method: prop.method
          }
        }
        return result
      }, {})
  }

  private schemas(schemas: { [schema: string]: SchemaObject | ReferenceObject }): ITsSchema[] {
    return Object.entries(schemas).flatMap(([ClassName, value]) => {
      return this.schema(value)
    })
  }

  private schema(value: SchemaObject | ReferenceObject, refs: string[] = [], required: boolean = false): any {
    if (isReferenceObject(value)) {
      refs.push(value.$ref.split('/').pop()!)
      const type = value.$ref.split('/').pop()
      return {
        type: [type],
        ref: type
      }
    } else {
      let data: ITsSchema = {}
      if (value.title) {
        data.ClassName = value.title
        data.refs = refs
      }
      if (value.anyOf && value.type === undefined) {
        for (const prop of value.anyOf) {
          const schema = this.schema(prop, refs)
          data.type = data.type || []
          data.type.push(schema.type[0])
          data.required = required
          data.ref = schema.type[0] !== 'null' ? schema.type[0] : data.ref
        }
      } else {
        for (const type of new Array(value.type).flatMap((prop) => prop)) {
          if (type === 'object') {
            if (value.properties) {
              data.schema = Object.entries(value.properties).reduce((props: any, [n, v]) => {
                props[n] = this.schema(v, refs, !!value.required?.find((prop) => prop === n))
                return props
              }, {})
              return data
            }
          }

          if (type === 'array' && value.items) {
            const schema = this.schema(value.items, refs)
            data.type = data.type || []
            data.type.push(schema.type[0] + '[]')
            data.required = required
            data.ref = schema.type[0] !== 'null' && schema.type[0] !== 'string' ? schema.type[0] : data.ref
            data.array = true
          } else {
            data.type = data.type || []
            data.type.push(types[type as string])
            data.required = required
          }
        }
      }
      return data
    }
  }
}
