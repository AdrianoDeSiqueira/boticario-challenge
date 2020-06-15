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
      const { code, value, date, socialSecurityNumber } = httpRequest.body
      const order = await this.addOrder.add({
        code,
        value,
        date,
        socialSecurityNumber
      })
      return created(order)
    } catch (error) {
      return serverError(error)
    }
  }
}
