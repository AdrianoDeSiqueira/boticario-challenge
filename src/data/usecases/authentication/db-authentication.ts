import { Authentication, AuthenticationParams, AuthenticationModel, LoadAccountByEmailRepository, HashComparer } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authentication: AuthenticationParams): Promise< AuthenticationModel> {
    const reseller = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (reseller) {
      await this.hashComparer.compare(authentication.password, reseller.password)
    }
    return null
  }
}
