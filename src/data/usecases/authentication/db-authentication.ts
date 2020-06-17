import { Authentication, AuthenticationParams, AuthenticationModel, LoadResellerByEmailRepository, HashComparer, Encrypter, UpdateAccessTokenRepository } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadResellerByEmailRepository: LoadResellerByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    const reseller = await this.loadResellerByEmailRepository.loadByEmail(authentication.email)
    if (reseller) {
      const isValid = await this.hashComparer.compare(authentication.password, reseller.password)
      if (isValid) {
        const tokenAccess = await this.encrypter.encrypt(reseller.id)
        await this.updateAccessTokenRepository.updateAccessToken(reseller.id, tokenAccess)
        return {
          accessToken: tokenAccess
        }
      }
    }
    return null
  }
}
