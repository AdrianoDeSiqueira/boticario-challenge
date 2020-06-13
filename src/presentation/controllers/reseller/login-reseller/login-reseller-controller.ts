import { Controller, Validation, HttpRequest, HttpResponse } from './login-reseller-controller-protocols'

export class LoginResellerController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return Promise.resolve(null)
  }
}
