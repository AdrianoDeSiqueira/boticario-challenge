import env from '@/main/config/env'
import { LoadResellerByToken } from '@/domain/usecases/reseller/load-reseller-by-token'
import { DbLoadResellerByToken } from '@/data/usecases/reseller/load-reseller-by-token/db-load-reseller-by-token'
import { ResellerMongoRepository } from '@/infra/db/mongodb/reseller/reseller-mongo-repository'
import { JwtAdapter } from '@/infra/cryptograph/jwt-adapter/jwt-adapter'

export const makeDbLoadResellerByToken = (): LoadResellerByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const resellerMongoRepository = new ResellerMongoRepository()
  return new DbLoadResellerByToken(jwtAdapter, resellerMongoRepository)
}
