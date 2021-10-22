export interface IQueryProps {
  total?: number
  page?: number
  skip?: number
  take?: number
  count?: number
  sort?: string | null
  desc?: number | null
  word?: string | null
}

export const EmptyQueryPropsFactory = (props?: Partial<IQueryProps>): IQueryProps => ({
  total: 0,
  ...props
})
