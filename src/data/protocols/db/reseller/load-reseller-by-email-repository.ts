import { ResellerModel } from '@/domain/models/reseller'

export interface LoadResellerByEmailRepository {
  loadByEmail: (email: string) => Promise<ResellerModel>
}
