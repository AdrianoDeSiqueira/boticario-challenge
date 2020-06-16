import { OrderModel } from '@/domain/models/order'

export interface AddOrderModel {
  code: string
  value: number
  date: Date
  itr: string
  status?: string
}

export interface AddOrder {
  add: (order: AddOrderModel) => Promise<OrderModel>
}
