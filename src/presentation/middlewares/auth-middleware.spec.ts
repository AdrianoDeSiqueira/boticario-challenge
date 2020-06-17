import { AuthMiddleware } from './auth-middleware'
import { LoadResellerByToken, ResellerModel, HttpRequest } from './auth-middleware-protocols'
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

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
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

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const spyLoad = jest.spyOn(loadAccountByTokenStub, 'load')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(spyLoad).toBeCalledWith(httpRequest.headers['x-access-token'])
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
