import { LoadOrdersController } from '../../../../presentation/controllers/order/load-order/load-orders-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { DbLoadOrders } from '@/data/usecases/order/load-orders/db-load-orders'
import { ResellerMongoRepository } from '@/infra/db/mongodb/reseller/reseller-mongo-repository'
import { OrderMongoRepository } from '@/infra/db/mongodb/order/order-mongo-repository'

export const makeLoadOrdersController = (): Controller => {
  const loadResellerByIdRepository = new ResellerMongoRepository()
  const loadOrdersRepository = new OrderMongoRepository()
  const dbLoadOrders = new DbLoadOrders(loadResellerByIdRepository, loadOrdersRepository)
  const addResellerController = new LoadOrdersController(dbLoadOrders)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(addResellerController, logMongoRepository)
}
