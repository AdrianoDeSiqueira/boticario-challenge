import { Status } from '../../../data/protocols/condition/status'

export class StatusAdapter implements Status {
  async get (socialSecurityNumber: string): Promise<string> {
    return Promise.resolve('Em validação')
  }
}
