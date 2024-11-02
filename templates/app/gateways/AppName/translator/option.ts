/* eslint camelcase: 0 */
import { EmptyQueryPropsFactory, IQueryProps } from '@/entities/Query'
import { IOptionsProps } from '@/entities/Options'

export const optionsToQuery = (props?: IOptionsProps): IQueryProps => {
  if (!props) {
    return EmptyQueryPropsFactory()
  }
  const { page, itemsPerPage, sortBy, sortDesc, word, query } = props
  const skip = page ? page - 1 : 0
  const take = itemsPerPage || 0
  return {
    page: 0,
    total: 1,
    skip: (skip < 0 ? 0 : skip) * take,
    take: itemsPerPage || 10,
    sort: sortBy && sortBy[0] !== undefined ? sortBy : undefined,
    desc: sortDesc && sortDesc[0] !== undefined ? Number(sortDesc[0]) : undefined,
    word: word || undefined,
    query: query ? JSON.stringify(query) : undefined
  }
}
