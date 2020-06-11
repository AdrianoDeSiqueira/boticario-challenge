import { ResellerModel } from '../../models/reseller'

export interface AddResellerModel {
  socialSecurityNumber: string
  name: string
  email: string
  password: string
}

export interface AddReseller {
  add: (reseller: AddResellerModel) => Promise<ResellerModel>
}
