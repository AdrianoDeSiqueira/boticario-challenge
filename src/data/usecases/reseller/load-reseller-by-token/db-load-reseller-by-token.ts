import { LoadResellerByToken } from '@/domain/usecases/reseller/load-reseller-by-token'

import { Decrypter, ResellerModel } from './db-load-reseller-by-token-protocols'

export class DbLoadResellerByToken implements LoadResellerByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async load (accessToken: string): Promise<ResellerModel> {
    await this.decrypter.decrypt(accessToken)
    return Promise.resolve(null)
  }
}
