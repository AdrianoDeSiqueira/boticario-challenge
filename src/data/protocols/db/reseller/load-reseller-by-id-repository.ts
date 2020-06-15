import { ResellerModel } from '../../../../domain/models/reseller'

export interface LoadResellerByIdRepository {
  loadById: (id: string) => Promise<ResellerModel>
}
