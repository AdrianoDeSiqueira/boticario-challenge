import { HttpRequest, HttpResponse, Controller, Validation } from './add-reseller-controller-protocols'
import { badRequest, serverError, created } from '@/presentation/helpers/http/http-helper'
import { AddReseller } from '@/domain/usecases/reseller/add-reseller'

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
      const { itr, name, email, password } = httpRequest.body
      const reseller = await this.addReseller.add({
        itr,
        name,
        email,
        password
      })
      return created(reseller)
    } catch (error) {
      return serverError(error)
    }
  }
}
