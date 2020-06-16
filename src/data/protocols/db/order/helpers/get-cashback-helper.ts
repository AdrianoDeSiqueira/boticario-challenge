export interface GetCashbackHelper {
  get: (valuePurchase: number) => Promise<object>
}
