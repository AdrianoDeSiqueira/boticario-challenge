import { LoadCashback, LoadCashbackApi, CashbackModel } from './api-load-cashback-protocols'

export class ApiLoadCashback implements LoadCashback {
  constructor (
    private readonly loadCashbackApi: LoadCashbackApi
  ) {}

  async load (itr: string): Promise<CashbackModel> {
    return await this.loadCashbackApi.load(itr)
  }
}
