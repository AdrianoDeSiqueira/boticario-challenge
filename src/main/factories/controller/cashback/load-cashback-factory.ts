import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeApiLoadCashback } from '@/main/factories/usecases/cashback/load-cashback/api-load-cashback-factory'
import { LoadCashbackController } from '@/presentation/controllers/cashback/load-cashback/load-cashback-controller'
import { Controller } from '@/presentation/protocols/controller'

export const makeLoadCashbackController = (): Controller => {
  const controller = new LoadCashbackController(makeApiLoadCashback())
  return makeLogControllerDecorator(controller)
}
