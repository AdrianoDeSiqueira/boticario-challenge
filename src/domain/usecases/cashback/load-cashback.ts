import { CashbackModel } from '@/domain/models/cashback'

export interface LoadCashback {
  load: (itr: string) => Promise<CashbackModel>
}
