import { ResellerModel } from '../../../../domain/models/reseller'

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<ResellerModel>
}
