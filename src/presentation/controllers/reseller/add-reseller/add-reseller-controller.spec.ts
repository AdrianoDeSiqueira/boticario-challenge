import { AddResellerController } from './add-reseller-controller'
import { HttpRequest, Validation, AddReseller, AddResellerModel, ResellerModel } from './add-reseller-controller-protocols'
import { badRequest, forbidden, serverError, created } from '@/presentation/helpers/http/http-helper'
import { MissingParamError, ServerError, EmailInUseError } from '@/presentation/errors'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddReseller = (): AddReseller => {
  class AddResellerStub implements AddReseller {
    async add (reseller: AddResellerModel): Promise<ResellerModel> {
      return Promise.resolve(makeFakeReseller())
    }
  }
  return new AddResellerStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    itr: '99999999999',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeReseller = (): ResellerModel => ({
  id: 'any_id',
  itr: '99999999999',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

interface SutTypes {
  sut: AddResellerController
  validationStub: Validation
  addResellerStub: AddReseller
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addResellerStub = makeAddReseller()
  const sut = new AddResellerController(validationStub, addResellerStub)
  return {
    sut,
    validationStub,
    addResellerStub
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

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call AddReseller with correct values', async () => {
    const { sut, addResellerStub } = makeSut()
    const addSpy = jest.spyOn(addResellerStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      itr: '99999999999',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 403 if AddReseller returns null', async () => {
    const { sut, addResellerStub } = makeSut()
    jest.spyOn(addResellerStub, 'add').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 500 if AddReseller throws', async () => {
    const { sut, addResellerStub } = makeSut()
    jest.spyOn(addResellerStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(created(makeFakeReseller()))
  })
})
