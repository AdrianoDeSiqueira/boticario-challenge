import { AddOrder, AddOrderModel, OrderModel, GetStatusHelper, AddOrderRepository } from './db-add-order-protocols'

export class DbAddOrder implements AddOrder {
  constructor (
    private readonly status: GetStatusHelper,
    private readonly addOrderRepository: AddOrderRepository
  ) {}

  async add (orderData: AddOrderModel): Promise<OrderModel> {
    const status = await this.status.get(orderData.socialSecurityNumber)
    const order = await this.addOrderRepository.add(Object.assign({}, orderData, { status: status }))
    return order
  }
}
