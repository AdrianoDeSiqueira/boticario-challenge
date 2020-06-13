import { Controller, Validation, HttpRequest, HttpResponse } from './login-reseller-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helper'

export class LoginResellerController implements Controller {
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
