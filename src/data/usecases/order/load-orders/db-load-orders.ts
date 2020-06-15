import { LoadResellerByIdRepository, LoadOrders, OrderModel, LoadOrdersRepository } from './db-load-orders-protocols'

export class DbLoadOrders implements LoadOrders {
  constructor (
    private readonly loadResellerByIdRepository: LoadResellerByIdRepository,
    private readonly loadOrdersRepository: LoadOrdersRepository
  ) {}

  async load (resellerId: string): Promise<OrderModel[]> {
    const reseller = await this.loadResellerByIdRepository.loadById(resellerId)
    if (reseller) {
      await this.loadOrdersRepository.loadAll(reseller.socialSecurityNumber)
    }
    return null
  }
}
