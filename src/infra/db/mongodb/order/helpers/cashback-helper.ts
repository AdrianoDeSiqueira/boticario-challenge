import { GetCashbackHelper } from '@/data/protocols/db/order/helpers/get-cashback-helper'

export class CashbackHelper implements GetCashbackHelper {
  async get (valuePurchase: number): Promise<object> {
    let cashbackPerc = 10
    if (valuePurchase > 1000 && valuePurchase <= 1500) {
      cashbackPerc = 15
    } else if (valuePurchase > 1500) {
      cashbackPerc = 20
    }
    const cashbackValue = Number.parseFloat(((cashbackPerc * valuePurchase) / 100).toFixed(2))
    return Promise.resolve({
      cashbackPerc,
      cashbackValue
    })
  }
}
