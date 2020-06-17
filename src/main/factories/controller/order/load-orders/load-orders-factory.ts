import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadOrders } from '@/main/factories/usecases/order/load-order/db-load-order-factory'
import { Controller } from '@/presentation/protocols'
import { LoadOrdersController } from '@/presentation/controllers/order/load-orders/load-orders-controller'

export const makeLoadOrdersController = (): Controller => {
  const controller = new LoadOrdersController(makeDbLoadOrders())
  return makeLogControllerDecorator(controller)
}
