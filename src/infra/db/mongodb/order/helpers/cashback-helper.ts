import { GetCashbackHelper } from '@/data/protocols/db/order/helpers/get-cashback-helper'

export class CashbackHelper implements GetCashbackHelper {
  async get (valuePurchase: number): Promise<object> {
    let perc = 10
    if (valuePurchase > 1000 && valuePurchase <= 1550) {
      perc = 15
    }
    const value = ((perc * valuePurchase) / 100)
    return {
      perc,
      value
    }
  }
}
