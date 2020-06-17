import { HttpRequest, HttpResponse, Controller, Validation, AddOrder } from './add-order-controller-protocols'
import { badRequest, serverError, created } from '@/presentation/helpers/http/http-helper'

export class AddOrderController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addOrder: AddOrder
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { resellerId } = httpRequest
      const { itr, code, value, date } = httpRequest.body
      const order = await this.addOrder.add({
        itr,
        code,
        value,
        date,
        resellerId
      })
      return created(order)
    } catch (error) {
      return serverError(error)
    }
  }
}
