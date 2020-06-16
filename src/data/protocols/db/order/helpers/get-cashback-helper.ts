export interface CashbackModel {
  cashbackPerc?: number
  cashbackValue?: number
}

export interface GetCashbackHelper {
  get: (valuePurchase: number) => Promise<CashbackModel>
}
