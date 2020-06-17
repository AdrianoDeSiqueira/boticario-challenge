import { ResellerModel } from '@/domain/models/reseller'

export interface LoadResellerByToken {
  load: (accessToken: string) => Promise<ResellerModel>
}
