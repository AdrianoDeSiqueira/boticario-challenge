import env from '@/main/config/env'
import { ResellerMongoRepository } from '@/infra/db/mongodb/reseller/reseller-mongo-repository'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptograph/jwt-adapter/jwt-adapter'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { Authentication } from '@/domain/usecases/reseller/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const resellerMongoRepository = new ResellerMongoRepository()
  return new DbAuthentication(resellerMongoRepository, bcryptAdapter, jwtAdapter, resellerMongoRepository)
}
