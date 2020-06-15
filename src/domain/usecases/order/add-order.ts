import { OrderModel } from '@/domain/models/order'

export interface AddOrderModel {
  code: string
  value: string
  date: string
  socialSecurityNumber: string
  status?: string
}

export interface AddOrder {
  add: (order: AddOrderModel) => Promise<OrderModel>
}
