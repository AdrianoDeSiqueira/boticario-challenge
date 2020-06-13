import env from '../../config/env'
import { AddOrderController } from '../../../presentation/controllers/order/add-order/add-order-controller'
import { Controller } from '../../../presentation/protocols'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeAddOrderValidation } from './add-order-validation-factory'
import { DbAddOrder } from '../../../data/usecases/order/db-add-order'
import { StatusHelper } from '../../../infra/helpers/status/status-helper'
import { OrderMongoRepository } from '../../../infra/db/mongodb/order/order-mongo-repository'

export const makeAddOrderController = (): Controller => {
  const specificSocialSecurityNumber = env.specificSocialSecurityNumber
  const orderMongoRepository = new OrderMongoRepository()
  const status = new StatusHelper(specificSocialSecurityNumber)
  const dbAddOrder = new DbAddOrder(status, orderMongoRepository)
  const addResellerController = new AddOrderController(makeAddOrderValidation(), dbAddOrder)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(addResellerController, logMongoRepository)
}
