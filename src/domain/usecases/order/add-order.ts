import { OrderModel } from '@/domain/models/order'

export interface AddOrderModel {
  code: string
  value: number
  date: Date
  itr: string
  cashbackPerc?: number
  cashbackValue?: number
  status?: string
}

export interface AddOrder {
  add: (order: AddOrderModel) => Promise<OrderModel>
}
