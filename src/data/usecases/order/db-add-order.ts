import { AddOrder, AddOrderModel, OrderModel, Status, AddOrderRepository } from './db-add-order-protocols'

export class DbAddOrder implements AddOrder {
  constructor (
    private readonly status: Status,
    private readonly addOrderRepository: AddOrderRepository
  ) {}

  async add (orderData: AddOrderModel): Promise<OrderModel> {
    const status = await this.status.get(orderData.socialSecurityNumber)
    await this.addOrderRepository.add(Object.assign({}, orderData, { status: status }))
    return null
  }
}
