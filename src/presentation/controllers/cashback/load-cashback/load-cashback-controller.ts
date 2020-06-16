import { Controller, HttpRequest, HttpResponse, LoadCashback } from './load-cashback-controller-protocols'
import { serverError } from '@/presentation/helpers/http/http-helper'

export class LoadCashbackController implements Controller {
  constructor (
    private readonly cashbackLoad: LoadCashback
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { itr } = httpRequest.params
      await this.cashbackLoad.load(itr)
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
