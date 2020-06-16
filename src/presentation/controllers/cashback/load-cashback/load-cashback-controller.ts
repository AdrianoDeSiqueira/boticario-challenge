import { Controller, HttpRequest, HttpResponse, LoadCashback } from './load-cashback-controller-protocols'

export class LoadCashbackController implements Controller {
  constructor (
    private readonly cashbackLoad: LoadCashback
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { itr } = httpRequest.params
    await this.cashbackLoad.load(itr)
    return Promise.resolve(null)
  }
}
