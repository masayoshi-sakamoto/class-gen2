/* eslint camelcase: 0 */
import { Query } from '@/infrastructure/network/Monitaro/schema/models'
import { EmptyOptionsPropsFactory, IOptionsProps } from '@/entities/Options'

export const toOptionsProps = (props?: Query): IOptionsProps => {
  if (!props) {
    return EmptyOptionsPropsFactory()
  }
  const { page, take, word } = props
  return EmptyOptionsPropsFactory({
    page,
    itemsPerPage: take,
    word
  })
}
