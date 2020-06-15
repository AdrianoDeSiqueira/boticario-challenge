import { LoadResellerByIdRepository, LoadOrders, OrderModel } from './db-load-orders-protocols'

export class DbLoadOrders implements LoadOrders {
  constructor (
    private readonly loadResellerByIdRepository: LoadResellerByIdRepository
  ) {}

  async load (resellerId: string): Promise<OrderModel[]> {
    await this.loadResellerByIdRepository.loadById(resellerId)
    return null
  }
}
