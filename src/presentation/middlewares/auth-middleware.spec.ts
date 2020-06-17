import { AuthMiddleware } from './auth-middleware'
import { LoadResellerByToken, ResellerModel } from './auth-middleware-protocols'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'

const makeLoadResellerByToken = (): LoadResellerByToken => {
  class LoadResellerByTokenStub implements LoadResellerByToken {
    async load (accessToken: string): Promise<ResellerModel> {
      return Promise.resolve(makeFakeReseller())
    }
  }
  return new LoadResellerByTokenStub()
}

const makeFakeReseller = (): ResellerModel => ({
  id: 'any_id',
  itr: 'any_socual_security_number',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadResellerByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadResellerByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
