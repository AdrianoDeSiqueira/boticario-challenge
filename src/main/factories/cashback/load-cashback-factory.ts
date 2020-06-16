import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import { LoadCashbackController } from '@/presentation/controllers/cashback/load-cashback/load-cashback-controller'
import { Controller } from '@/presentation/protocols/controller'
import { ApiLoadCashback } from '@/data/usecases/cashback/load-cashback/api-load-cashback'
import { CashbackApi } from '@/infra/external/cashback-api/cashback-api'
import env from '@/main/config/env'

export const makeLoadCashbackController = (): Controller => {
  const uri = env.cashbackApi
  const token = env.cashbackApiToken
  const cashbackApi = new CashbackApi(uri, token)
  const apiLoadCashback = new ApiLoadCashback(cashbackApi)
  const loadCashbackController = new LoadCashbackController(apiLoadCashback)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loadCashbackController, logMongoRepository)
}
