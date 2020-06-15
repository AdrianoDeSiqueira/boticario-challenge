import { Controller, HttpRequest, HttpResponse, LoadOrders } from './load-orders-controller-protocols'

export class LoadOrdersController implements Controller {
  constructor (
    private readonly loadOrders: LoadOrders
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadOrders.load(httpRequest.resellerId)
    return null
  }
}
