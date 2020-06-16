import env from '@/main/config/env'
import { AddOrderController } from '@/presentation/controllers/order/add-order/add-order-controller'
import { Controller } from '@/presentation/protocols'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeAddOrderValidation } from './add-order-validation-factory'
import { DbAddOrder } from '@/data/usecases/order/add-order/db-add-order'
import { StatusHelper } from '@/infra/db/mongodb/order/helpers/status-helper'
import { OrderMongoRepository } from '@/infra/db/mongodb/order/order-mongo-repository'
import { CashbackHelper } from '@/infra/db/mongodb/order/helpers/cashback-helper'

export const makeAddOrderController = (): Controller => {
  const specificITR = env.specificITR
  const orderMongoRepository = new OrderMongoRepository()
  const status = new StatusHelper(specificITR)
  const cashback = new CashbackHelper()
  const dbAddOrder = new DbAddOrder(status, cashback, orderMongoRepository)
  const addResellerController = new AddOrderController(makeAddOrderValidation(), dbAddOrder)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(addResellerController, logMongoRepository)
}
