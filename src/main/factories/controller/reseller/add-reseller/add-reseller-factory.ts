import { makeAddResellerValidation } from './add-reseller-validation-factory'
import { makeDbAddReseller } from '@/main/factories/usecases/reseller/add-reseller/db-add-reseller-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { Controller } from '@/presentation/protocols'
import { AddResellerController } from '@/presentation/controllers/reseller/add-reseller/add-reseller-controller'

export const makeAddResellerController = (): Controller => {
  const controller = new AddResellerController(makeAddResellerValidation(), makeDbAddReseller())
  return makeLogControllerDecorator(controller)
}
