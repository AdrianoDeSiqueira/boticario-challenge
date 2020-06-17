import { AddOrderController } from './add-order-controller'
import { HttpRequest, Validation, AddOrder, AddOrderModel, OrderModel } from './add-order-controller-protocols'
import { badRequest, serverError, created } from '@/presentation/helpers/http/http-helper'
import { MissingParamError, ServerError } from '@/presentation/errors'

const makeFakeDate = new Date()

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddOrder = (): AddOrder => {
  class AddOrderStub implements AddOrder {
    async add (order: AddOrderModel): Promise<OrderModel> {
      return Promise.resolve(makeFakeOrder())
    }
  }
  return new AddOrderStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    itr: '99999999999',
    code: 'any_code',
    value: 1999.99,
    date: makeFakeDate
  },
  resellerId: 'any_reseller_id'
})

const makeFakeOrder = (): OrderModel => ({
  id: 'any_id',
  itr: '99999999999',
  code: 'any_code',
  value: 1999.99,
  date: makeFakeDate,
  resellerId: 'any_reseller_id',
  status: 'any_status'
})

interface SutTypes {
  sut: AddOrderController
  validationStub: Validation
  addOrderStub: AddOrder
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addOrderStub = makeAddOrder()
  const sut = new AddOrderController(validationStub, addOrderStub)
  return {
    sut,
    validationStub,
    addOrderStub
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

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call AddOrder with correct values', async () => {
    const { sut, addOrderStub } = makeSut()
    const addSpy = jest.spyOn(addOrderStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(Object.assign({}, httpRequest.body, { resellerId: httpRequest.resellerId }))
  })

  test('Should return 500 if AddOrder throws', async () => {
    const { sut, addOrderStub } = makeSut()
    jest.spyOn(addOrderStub, 'add').mockImplementationOnce(async () => {
      return Promise.reject(Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(created(makeFakeOrder()))
  })
})
