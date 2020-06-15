import { AddOrderModel } from '@/domain/usecases/order/add-order'
import { OrderModel } from '@/domain/models/order'

export interface AddOrderRepository {
  add: (orderData: AddOrderModel) => Promise<OrderModel>
}
