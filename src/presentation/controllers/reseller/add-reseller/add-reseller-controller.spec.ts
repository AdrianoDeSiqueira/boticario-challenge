import { AddResellerController } from './add-reseller-controller'
import { HttpRequest } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'

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
    socialSecurityNumber: 'any_socual_security_number',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

interface SutTypes {
  sut: AddResellerController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddResellerController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddReseller Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
