/* eslint camelcase: 0 */
import { Query } from '@/infrastructure/network/<%= appName %>/schema'
import { EmptyQueryPropsFactory, IQueryProps } from '@/entities/Query'
import { IOptionsProps } from '@/entities/Options'

export const toQueryProps = (props?: Query): IQueryProps => {
  if (!props) {
    return EmptyQueryPropsFactory()
  }
  const { total, page, take, count, sort, desc } = props
  return EmptyQueryPropsFactory({
    total,
    page,
    take,
    count,
    sort,
    desc
  })
}

export const optionsToQuery = (props?: IOptionsProps): IQueryProps => {
  if (!props) {
    return EmptyQueryPropsFactory()
  }
  const { page, itemsPerPage, sortBy, sortDesc, word } = props
  const skip = page ? page - 1 : 0
  const take = itemsPerPage || 0
  return {
    skip: (skip < 0 ? 0 : skip) * take,
    take: itemsPerPage,
    sort: sortBy && sortBy[0] !== undefined ? sortBy[0] : undefined,
    desc: sortDesc && sortDesc[0] !== undefined ? Number(sortDesc[0]) : undefined,
    word: word || undefined
  }
}
