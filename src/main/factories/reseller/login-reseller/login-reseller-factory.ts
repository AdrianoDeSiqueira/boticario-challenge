import env from '@/main/config/env'
import { LoginResellerController } from '@/presentation/controllers/reseller/login-reseller/login-reseller-controller'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptograph/jwt-adapter/jwt-adapter'
import { ResellerMongoRepository } from '@/infra/db/mongodb/reseller/reseller-mongo-repository'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeLoginResellerValidation } from './login-reseller-validation-factory'

export const makeLoginResellerController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const resellerMongoRepository = new ResellerMongoRepository()
  const dbAuthentication = new DbAuthentication(resellerMongoRepository, bcryptAdapter, jwtAdapter, resellerMongoRepository)
  const loginController = new LoginResellerController(makeLoginResellerValidation(), dbAuthentication)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
