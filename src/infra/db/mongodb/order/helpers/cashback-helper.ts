import { GetCashbackHelper } from '@/data/protocols/db/order/helpers/get-cashback-helper'

export class CashbackHelper implements GetCashbackHelper {
  async get (valuePurchase: number): Promise<object> {
    let perc = 10
    if (valuePurchase > 1000 && valuePurchase <= 1500) {
      perc = 15
    } else if (valuePurchase > 1500) {
      perc = 20
    }
    const value = Number.parseFloat(((perc * valuePurchase) / 100).toFixed(2))
    return {
      perc,
      value
    }
  }
}
