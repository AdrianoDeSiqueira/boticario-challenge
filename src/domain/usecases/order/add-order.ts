import { OrderModel } from '@/domain/models/order'

export interface AddOrderModel {
  itr: string
  code: string
  value: number
  date: Date
  resellerId: string
  cashbackPerc?: number
  cashbackValue?: number
  status?: string
}

export interface AddOrder {
  add: (order: AddOrderModel) => Promise<OrderModel>
}
