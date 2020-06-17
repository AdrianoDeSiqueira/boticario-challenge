import { GetStatusHelper } from '@/data/protocols/db/order/helpers/get-status-helper'

export class StatusHelper implements GetStatusHelper {
  constructor (
    private readonly specificITR: string
  ) {}

  async get (itr: string): Promise<string> {
    if (Number.parseInt(this.specificITR) === Number.parseInt(itr)) {
      return Promise.resolve('Aprovado')
    }
    return Promise.resolve('Em validação')
  }
}
