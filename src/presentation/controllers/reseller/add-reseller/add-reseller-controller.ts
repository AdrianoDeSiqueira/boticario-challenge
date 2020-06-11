import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Controller } from '../../../protocols/controller'
import { Validation } from '../../../protocols/validation'

export class AddResellerController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return Promise.resolve(null)
  }
}
