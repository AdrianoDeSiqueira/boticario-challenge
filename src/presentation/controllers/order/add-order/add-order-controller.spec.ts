import { AddOrderController } from './add-order-controller'
import { HttpRequest, Validation } from './add-order-controller-protocols'

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
    code: 'any_code',
    value: 'any_value',
    date: 'any_date',
    socialSecurityNumber: 'any_social_security_number'
  }
})

interface SutTypes {
  sut: AddOrderController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddOrderController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddOrder Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
