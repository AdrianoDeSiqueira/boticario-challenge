import { OrderModel } from '../../models/order'

export interface LoadOrders {
  load: (resellerId: string) => Promise<OrderModel[]>
}
