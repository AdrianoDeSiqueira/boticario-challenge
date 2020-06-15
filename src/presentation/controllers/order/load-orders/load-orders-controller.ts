import { Controller, HttpRequest, HttpResponse, LoadOrders } from './load-orders-controller-protocols'
import { ok, noContent, serverError } from '@/presentation/helpers/http/http-helper'

export class LoadOrdersController implements Controller {
  constructor (
    private readonly loadOrders: LoadOrders
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const orders = await this.loadOrders.load()
      return orders.length ? ok(orders) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
