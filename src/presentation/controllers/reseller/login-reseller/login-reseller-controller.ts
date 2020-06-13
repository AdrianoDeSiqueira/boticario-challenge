import { Controller, Validation, Authentication, HttpRequest, HttpResponse } from './login-reseller-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helper'

export class LoginResellerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { email, password } = httpRequest.body
    await this.authentication.auth({
      email,
      password
    })
    return Promise.resolve(null)
  }
}
