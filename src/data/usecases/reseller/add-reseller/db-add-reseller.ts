import { AddReseller, AddResellerModel, ResellerModel, Hasher, AddResellerRepository, LoadResellerByEmailRepository } from './db-add-reseller-protocols'

export class DbAddReseller implements AddReseller {
  constructor (
    private readonly hasher: Hasher,
    private readonly addResellerRepository: AddResellerRepository,
    private readonly loadResellerByEmailRepository: LoadResellerByEmailRepository
  ) {}

  async add (resellerData: AddResellerModel): Promise<ResellerModel> {
    const reseller = await this.loadResellerByEmailRepository.loadByEmail(resellerData.email)
    if (!reseller) {
      const hashedPassword = await this.hasher.hash(resellerData.password)
      const newReseller = await this.addResellerRepository.add(Object.assign({}, resellerData, { password: hashedPassword }))
      return newReseller
    }
    return null
  }
}
