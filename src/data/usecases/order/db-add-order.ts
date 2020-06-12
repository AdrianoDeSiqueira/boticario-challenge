import { AddOrder, AddOrderModel, OrderModel, Status } from './db-add-order-protocols'

export class DbAddOrder implements AddOrder {
  constructor (
    private readonly status: Status
  ) {}

  async add (orderData: AddOrderModel): Promise<OrderModel> {
    await this.status.get(orderData.socialSecurityNumber)
    return null
  }
}
