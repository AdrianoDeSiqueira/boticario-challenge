import { GetStatusHelper } from '@/data/protocols/db/order/helpers/get-status-helper'

export class StatusHelper implements GetStatusHelper {
  constructor (private readonly specificSocialSecurityNumber: string) {}

  async get (socialSecurityNumber: string): Promise<string> {
    if (this.specificSocialSecurityNumber === socialSecurityNumber) {
      return Promise.resolve('Aprovado')
    }
    return Promise.resolve('Em validação')
  }
}
