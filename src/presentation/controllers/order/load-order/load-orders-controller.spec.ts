import { LoadOrdersController } from './load-orders-controller'
import { HttpRequest, LoadOrders } from './load-orders-controller-protocols'
import { OrderModel } from '../add-order/add-order-controller-protocols'
import { ok, noContent, serverError } from '../../../helpers/http/http-helper'

const makeLoadOrders = (): LoadOrders => {
  class LoadOrdersStub implements LoadOrders {
    async load (resellerId: string): Promise<OrderModel[]> {
      return Promise.resolve(makeFakeOrderModels())
    }
  }
  return new LoadOrdersStub()
}

const makeFakeOrderModels = (): OrderModel[] => [
  makeFakeOrderModel(),
  makeFakeOrderModel()
]

const makeFakeOrderModel = (): OrderModel => ({
  id: 'any_id',
  code: 'any_code',
  value: 'any_value',
  date: 'any_date',
  socialSecurityNumber: 'any_social_security_number',
  status: 'any_status'
})

const makeFakeRequest = (): HttpRequest => ({
  resellerId: 'any_reseller_id'
})

type SutTypes = {
  sut: LoadOrdersController
  loadOrdersStub: LoadOrders
}

const makeSut = (): SutTypes => {
  const loadOrdersStub = makeLoadOrders()
  const sut = new LoadOrdersController(loadOrdersStub)
  return {
    sut,
    loadOrdersStub
  }
}

describe('LoadOrders Controller', () => {
  test('Should call LoadOrders with correct value', async () => {
    const { sut, loadOrdersStub } = makeSut()
    const loadSpy = jest.spyOn(loadOrdersStub, 'load')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.resellerId)
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeOrderModels()))
  })

  test('Should return 204 if LoadOrders returns empty', async () => {
    const { sut, loadOrdersStub } = makeSut()
    jest.spyOn(loadOrdersStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadOrders throws', async () => {
    const { sut, loadOrdersStub } = makeSut()
    jest.spyOn(loadOrdersStub, 'load').mockImplementationOnce(async () => {
      return Promise.reject(Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
