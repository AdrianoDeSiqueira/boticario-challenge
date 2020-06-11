import { AddReseller, AddResellerModel, ResellerModel, Hasher } from './db-add-reseller-protocols'

export class DbAddReseller implements AddReseller {
  constructor (private readonly hasher: Hasher) {}

  async add (reseller: AddResellerModel): Promise<ResellerModel> {
    await this.hasher.hash(reseller.password)
    return null
  }
}
