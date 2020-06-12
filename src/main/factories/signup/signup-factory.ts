import { AddResellerController } from '../../../presentation/controllers/reseller/add-reseller/add-reseller-controller'
import { DbAddReseller } from '../../../data/usecases/reseller/db-add-reseller'
import { BcryptAdapter } from '../../../infra/cryptograph/bcrypt-adapter/bcrypt-adapter'
import { ResellerMongoRepository } from '../../../infra/db/mongodb/reseller/reseller-mongo-repository'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const resellerMongoRepository = new ResellerMongoRepository()
  const dbAddReseller = new DbAddReseller(bcryptAdapter, resellerMongoRepository)
  const addResellerController = new AddResellerController(makeSignUpValidation(), dbAddReseller)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(addResellerController, logMongoRepository)
}
