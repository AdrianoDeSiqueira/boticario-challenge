import { OrderModel } from '@/domain/models/order'

export interface LoadOrders {
  load: (resellerId: string) => Promise<OrderModel[]>
}
