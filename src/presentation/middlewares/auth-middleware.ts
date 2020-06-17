import { Middleware, HttpRequest, HttpResponse, LoadResellerByToken } from './auth-middleware-protocols'
import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadResellerByToken: LoadResellerByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const reseller = await this.loadResellerByToken.load(accessToken)
        if (reseller) {
          return ok({ resellerId: reseller.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
