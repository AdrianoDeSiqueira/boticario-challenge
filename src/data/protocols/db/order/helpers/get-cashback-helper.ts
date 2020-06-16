export interface GetCashbackModel {
  cashbackPerc?: number
  cashbackValue?: number
}

export interface GetCashbackHelper {
  get: (valuePurchase: number) => Promise<GetCashbackModel>
}
