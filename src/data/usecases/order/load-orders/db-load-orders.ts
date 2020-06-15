import { LoadResellerByIdRepository, LoadOrders, OrderModel, LoadOrdersRepository } from './db-load-orders-protocols'

export class DbLoadOrders implements LoadOrders {
  constructor (
    private readonly loadResellerByIdRepository: LoadResellerByIdRepository,
    private readonly loadOrdersRepository: LoadOrdersRepository
  ) {}

  async load (resellerId: string): Promise<OrderModel[]> {
    const reseller = await this.loadResellerByIdRepository.loadById(resellerId)
    if (reseller) {
      const orders = await this.loadOrdersRepository.loadAll(reseller.socialSecurityNumber)
      if (orders) {
        return orders
      }
    }
    return null
  }
}
