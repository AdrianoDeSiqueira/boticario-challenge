import env from '@/main/config/env'
import { ApiLoadCashback } from '@/data/usecases/cashback/load-cashback/api-load-cashback'
import { LoadCashback } from '@/domain/usecases/cashback/load-cashback'
import { CashbackApi } from '@/infra/external/cashback-api/cashback-api'

export const makeApiLoadCashback = (): LoadCashback => {
  const uri = env.cashbackApi
  const token = env.cashbackApiToken
  const cashbackApi = new CashbackApi(uri, token)
  return new ApiLoadCashback(cashbackApi)
}
