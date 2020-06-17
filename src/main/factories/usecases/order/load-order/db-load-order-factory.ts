import { DbLoadOrders } from '@/data/usecases/order/load-orders/db-load-orders'
import { LoadOrders } from '@/domain/usecases/order/load-orders'
import { OrderMongoRepository } from '@/infra/db/mongodb/order/order-mongo-repository'

export const makeDbLoadOrders = (): LoadOrders => {
  const orderMongoRepository = new OrderMongoRepository()
  return new DbLoadOrders(orderMongoRepository)
}
