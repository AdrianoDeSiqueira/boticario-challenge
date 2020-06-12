import { HttpRequest, HttpResponse, Controller, Validation } from './add-order-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helper'

export class AddOrderController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return Promise.resolve(null)
  }
}
