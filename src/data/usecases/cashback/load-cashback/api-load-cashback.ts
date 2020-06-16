import { LoadCashback, LoadCashbackApi, CashbackModel } from './api-load-cashback-protocols'

export class ApiLoadCashback implements LoadCashback {
  constructor (
    private readonly loadCashbackApi: LoadCashbackApi
  ) {}

  async load (itr: string): Promise<CashbackModel> {
    await this.loadCashbackApi.load(itr)
    return Promise.resolve(null)
  }
}
