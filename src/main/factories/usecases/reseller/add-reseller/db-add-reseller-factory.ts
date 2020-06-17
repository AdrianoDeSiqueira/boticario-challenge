import { DbAddReseller } from '@/data/usecases/reseller/add-reseller/db-add-reseller'
import { AddReseller } from '@/domain/usecases/reseller/add-reseller'
import { ResellerMongoRepository } from '@/infra/db/mongodb/reseller/reseller-mongo-repository'
import { BcryptAdapter } from '@/infra/cryptograph/bcrypt-adapter/bcrypt-adapter'

export const makeDbAddReseller = (): AddReseller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const resellerMongoRepository = new ResellerMongoRepository()
  return new DbAddReseller(bcryptAdapter, resellerMongoRepository, resellerMongoRepository)
}
