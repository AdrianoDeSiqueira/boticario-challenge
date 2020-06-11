import { HttpRequest, HttpResponse, Controller, Validation } from './add-reseller-controller-protocols'
import { badRequest, serverError } from '../../../helpers/http/http-helper'
import { AddReseller } from '../../../../domain/usecases/reseller/add-reseller'

export class AddResellerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addReseller: AddReseller
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { socialSecurityNumber, name, email, password } = httpRequest.body
      await this.addReseller.add({
        socialSecurityNumber,
        name,
        email,
        password
      })
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
