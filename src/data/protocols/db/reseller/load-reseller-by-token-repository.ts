import { ResellerModel } from '@/domain/models/reseller'

export interface LoadResellerByTokenRepository {
  loadByToken: (token: string) => Promise<ResellerModel>
}
