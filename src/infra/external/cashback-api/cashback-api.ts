import { LoadCashbackApi } from '@/data/protocols/external/load-cashback-api'
import { CashbackModel } from '@/domain/models/cashback'
import request from 'request-promise-native'
import env from '@/main/config/env'

export class CashbackApi implements LoadCashbackApi {
  async load (itr: string): Promise<CashbackModel> {
    const queryString = '?cpf=' + itr
    const options = {
      uri: env.cashbackApi + queryString,
      headers: {
        contentType: 'application/json',
        token: env.cashbackApiToken
      }
    }
    const res = await request.get(options)
    const obj = JSON.parse(res)
    if (obj.statusCode === 200) {
      return { credit: obj.body.credit }
    }
    return null
  }
}
