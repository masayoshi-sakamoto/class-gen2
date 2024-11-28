import { EmptyQueryPropsFactory, IQueryProps } from './Query'

export interface IResponseProps<IProps> {
  items: IProps[]
  query: IQueryProps
  loading?: boolean
}

export default class ResponseEntity<IProps> {
  private _props: IResponseProps<IProps>

  constructor(props: IResponseProps<IProps>) {
    this._props = props
  }

  get props(): IResponseProps<IProps> {
    return this._props
  }

  get clone(): IResponseProps<IProps> {
    return EmptyResponsePropsFactory(structuredClone(this._props))
  }
}

export const EmptyResponsePropsFactory = <IProps>(props?: Partial<IResponseProps<IProps>> | null): IResponseProps<IProps> => ({
  items: [],
  query: EmptyQueryPropsFactory(),
  loading: false,
  ...props
})

export const ResponsePropsFactory = <IProps>(value: IResponseProps<IProps>, props: IResponseProps<IProps> | null): IResponseProps<IProps> => {
  const query = EmptyQueryPropsFactory({ ...props?.query })
  return {
    items: value.items.concat(props?.items || []),
    query: {
      ...query,
      page: query.page + 1
    },
    loading: false
  }
}
