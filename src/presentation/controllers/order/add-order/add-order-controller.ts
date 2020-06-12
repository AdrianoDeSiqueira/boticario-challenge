import { HttpRequest, HttpResponse, Controller, Validation } from './add-order-controller-protocols'

export class AddOrderController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return Promise.resolve(null)
  }
}
