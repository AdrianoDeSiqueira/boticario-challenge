import { Middleware, HttpRequest, HttpResponse, LoadResellerByToken } from './auth-middleware-protocols'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadResellerByToken: LoadResellerByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
