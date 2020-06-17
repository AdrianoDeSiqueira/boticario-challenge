import { makeLoginResellerValidation } from './login-reseller-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/reseller/authentication/db-authentication-factory'
import { Controller } from '@/presentation/protocols'
import { LoginResellerController } from '@/presentation/controllers/reseller/login-reseller/login-reseller-controller'

export const makeLoginResellerController = (): Controller => {
  const controller = new LoginResellerController(makeLoginResellerValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
