import { LoadCashbackApi } from '@/data/protocols/external/load-cashback-api'
import { CashbackModel } from '@/domain/models/cashback'
import request from 'request-promise-native'
import queryString from 'query-string'

export class CashbackApi implements LoadCashbackApi {
  constructor (
    private readonly uri: string,
    private readonly token: string
  ) {}

  async load (itr: string, param: string): Promise<CashbackModel> {
    const qString = queryString.stringify({ [param]: itr })
    const options = {
      uri: this.uri + '?' + qString,
      headers: {
        contentType: 'application/json',
        token: this.token
      }
    }
    const res = await request.get(options)
    const { statusCode, body } = JSON.parse(res)
    if (statusCode === 200) {
      return { credit: body.credit }
    }
    return null
  }
}
