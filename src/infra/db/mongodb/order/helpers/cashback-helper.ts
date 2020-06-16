import { GetCashbackHelper } from '@/data/protocols/db/order/helpers/get-cashback-helper'

export class CashbackHelper implements GetCashbackHelper {
  async get (valuePurchase: number): Promise<object> {
    let perc: number
    if (valuePurchase <= 1000) {
      perc = 10
    }
    const value = (perc * valuePurchase) / 100
    return {
      perc,
      value
    }
  }
}
