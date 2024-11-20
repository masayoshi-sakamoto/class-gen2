/* eslint camelcase: 0 */
import { OrderOrdersRequest } from '@/infrastructure/network/Monitaro/schema/models'

export const toOrderRequest = (props: any): OrderOrdersRequest => {
  const { id, order } = props
  return {
    id,
    order
  }
}
