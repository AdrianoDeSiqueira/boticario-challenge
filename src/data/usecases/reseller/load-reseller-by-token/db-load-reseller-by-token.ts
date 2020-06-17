import { LoadResellerByToken } from '@/domain/usecases/reseller/load-reseller-by-token'

import { Decrypter, LoadResellerByTokenRepository, ResellerModel } from './db-load-reseller-by-token-protocols'

export class DbLoadResellerByToken implements LoadResellerByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadResellerByTokenRepository: LoadResellerByTokenRepository
  ) {}

  async load (accessToken: string): Promise<ResellerModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const reseller = await this.loadResellerByTokenRepository.loadByToken(accessToken)
      if (reseller) {
        return reseller
      }
    }
    return null
  }
}
