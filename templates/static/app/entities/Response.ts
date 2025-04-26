import { EmptyQueryPropsFactory, IQueryProps } from './Query'

export interface IResponseProps<P> {
  items: P[]
  byIds?: {
    [id: string]: P
  }
  query: IQueryProps
  loading?: boolean
  last?: P | null
}

export default class ResponseEntity<P> {
  private _props: IResponseProps<P>

  constructor(props: IResponseProps<P>) {
    this._props = props
  }

  get props(): IResponseProps<P> {
    return this._props
  }

  get clone(): IResponseProps<P> {
    return EmptyResponsePropsFactory(structuredClone(this._props))
  }
}

export const EmptyResponsePropsFactory = <P>(props?: Partial<IResponseProps<P>> | null): IResponseProps<P> => ({
  items: [],
  query: EmptyQueryPropsFactory(),
  loading: false,
  last: null,
  ...props
})

export const ResponsePropsFactory = <P>(value: IResponseProps<P>, props: IResponseProps<P> | null): IResponseProps<P> => {
  const query = EmptyQueryPropsFactory({ ...props?.query })
  return {
    items: value.items.concat(props?.items || []),
    query: {
      ...query,
      page: query.page + 1
    },
    last: props ? props.items[0] : null
  }
}

export const ResponsePropsByIdsFactory = <P>(value: IResponseProps<P>, props: IResponseProps<P> | null, current?: any | null): IResponseProps<P> => {
  const query = EmptyQueryPropsFactory({ ...props?.query })
  let byIds = {}
  if (current) {
    byIds = { [current.id]: current }
  }
  byIds = { ...byIds, ...value.byIds }
  const length = Object.values(byIds).length
  if (props?.items) {
    for (const prop of props.items as any) {
      byIds = { ...byIds, [prop.id]: prop }
    }
  }
  const items: P[] = Object.values(byIds)
  const diff = length - (props?.items.length || 0)
  const last = props ? (diff % props.items.length > 0 ? items[props.items.length + diff] : props.items[0]) : null
  return {
    byIds,
    items,
    query: {
      ...query,
      page: query.page + 1
    },
    last
  }
}
export const SetResponsePropsByIds = <P>(value: IResponseProps<P>, current: any): IResponseProps<P> => {
  const byIds = { ...value.byIds, [current.id]: current }
  const items: P[] = Object.values(byIds)
  return {
    ...value,
    byIds,
    items
  }
}
