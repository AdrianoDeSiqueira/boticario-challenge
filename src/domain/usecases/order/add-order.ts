import { OrderModel } from '../../models/order'

export interface AddOrderModel {
  code: string
  value: string
  date: string
  socialSecurityNumber: string
}

export interface AddOrder {
  add: (order: AddOrderModel) => Promise<OrderModel>
}
