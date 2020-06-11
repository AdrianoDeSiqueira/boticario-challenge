import { AddReseller, AddResellerModel, ResellerModel, Hasher, AddResellerRepository } from './db-add-reseller-protocols'

export class DbAddReseller implements AddReseller {
  constructor (
    private readonly hasher: Hasher,
    private readonly addResellerRepository: AddResellerRepository
  ) {}

  async add (resellerData: AddResellerModel): Promise<ResellerModel> {
    const hashedPassword = await this.hasher.hash(resellerData.password)
    await this.addResellerRepository.add(Object.assign({}, resellerData, { password: hashedPassword }))
    return null
  }
}
