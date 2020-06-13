import { Authentication, AuthenticationParams, AuthenticationModel, LoadAccountByEmailRepository, HashComparer, Encrypter } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth (authentication: AuthenticationParams): Promise< AuthenticationModel> {
    const reseller = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (reseller) {
      await this.hashComparer.compare(authentication.password, reseller.password)
      await this.encrypter.encrypt(reseller.id)
    }
    return null
  }
}
