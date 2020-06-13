import { LoginResellerController } from './login-reseller-controller'
import { HttpRequest, Validation } from './login-reseller-controller-protocols'
import { badRequest } from '../../../helpers/http/http-helper'
import { MissingParamError } from '../../../errors'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

interface SutTypes {
  sut: LoginResellerController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new LoginResellerController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('LoginReseller Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
