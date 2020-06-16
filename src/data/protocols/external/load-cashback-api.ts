import { CashbackModel } from '@/domain/models/cashback'

export interface LoadCashbackApi {
  load: (itr: string, param: string) => Promise<CashbackModel>
}
