import { Controller, HttpRequest, HttpResponse, LoadOrders } from './load-orders-controller-protocols'
import { ok } from '../../../helpers/http/http-helper'

export class LoadOrdersController implements Controller {
  constructor (
    private readonly loadOrders: LoadOrders
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const orders = await this.loadOrders.load(httpRequest.resellerId)
    return ok(orders)
  }
}
