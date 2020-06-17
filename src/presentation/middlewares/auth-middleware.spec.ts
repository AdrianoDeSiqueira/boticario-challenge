import { AuthMiddleware } from './auth-middleware'
import { LoadResellerByToken, ResellerModel, HttpRequest } from './auth-middleware-protocols'
import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
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
  itr: '99999999999',
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
  loadResellerByTokenStub: LoadResellerByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadResellerByTokenStub = makeLoadResellerByToken()
  const sut = new AuthMiddleware(loadResellerByTokenStub)
  return {
    sut,
    loadResellerByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadResellerByToken with correct accessToken', async () => {
    const { sut, loadResellerByTokenStub } = makeSut()
    const spyLoad = jest.spyOn(loadResellerByTokenStub, 'load')
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(spyLoad).toBeCalledWith(httpRequest.headers['x-access-token'])
  })

  test('Should return 403 if LoadResellerByToken returns null', async () => {
    const { sut, loadResellerByTokenStub } = makeSut()
    jest.spyOn(loadResellerByTokenStub, 'load').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 500 if LoadResellerByToken throws', async () => {
    const { sut, loadResellerByTokenStub } = makeSut()
    jest.spyOn(loadResellerByTokenStub, 'load').mockImplementationOnce(async () => {
      return Promise.reject(Error())
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if LoadResellerByToken returns an reseller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({ resellerId: 'any_id', resellerItr: '99999999999' }))
  })
})
