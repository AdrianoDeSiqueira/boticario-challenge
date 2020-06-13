import { Authentication, AuthenticationParams, AuthenticationModel, LoadAccountByEmailRepository } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (authentication: AuthenticationParams): Promise< AuthenticationModel> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    return null
  }
}
