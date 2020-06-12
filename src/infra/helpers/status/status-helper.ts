import { Status } from '../../../data/protocols/helpers/status/status'

export class StatusHelper implements Status {
  constructor (private readonly specificSocialSecurityNumber: string) {}

  async get (socialSecurityNumber: string): Promise<string> {
    if (this.specificSocialSecurityNumber === socialSecurityNumber) {
      return Promise.resolve('Aprovado')
    }
    return Promise.resolve('Em validação')
  }
}
