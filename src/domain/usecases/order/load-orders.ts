import { OrderModel } from '@/domain/models/order'

export interface LoadOrders {
  load: () => Promise<OrderModel[]>
}
