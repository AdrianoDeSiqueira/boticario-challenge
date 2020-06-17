import { LoadOrders, OrderModel, LoadOrdersRepository } from './db-load-orders-protocols'

export class DbLoadOrders implements LoadOrders {
  constructor (
    private readonly loadOrdersRepository: LoadOrdersRepository
  ) {}

  async load (resellerId: string): Promise<OrderModel[]> {
    const orders = await this.loadOrdersRepository.loadAll(resellerId)
    return orders
  }
}
