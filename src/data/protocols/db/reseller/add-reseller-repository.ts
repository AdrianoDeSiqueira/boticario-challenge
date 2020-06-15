import { AddResellerModel } from '@/domain/usecases/reseller/add-reseller'
import { ResellerModel } from '@/domain/models/reseller'

export interface AddResellerRepository {
  add: (resellerData: AddResellerModel) => Promise<ResellerModel>
}
