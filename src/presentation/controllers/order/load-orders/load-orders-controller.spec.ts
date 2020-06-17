import { LoadOrdersController } from './load-orders-controller'
import { HttpRequest, LoadOrders } from './load-orders-controller-protocols'
import { ok, noContent, serverError } from '@/presentation/helpers/http/http-helper'
import { OrderModel } from '@/domain/models/order'

const makeFakeDate = new Date()

const makeLoadOrders = (): LoadOrders => {
  class LoadOrdersStub implements LoadOrders {
    async load (): Promise<OrderModel[]> {
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
  itr: 'any_social_security_number',
  code: 'any_code',
  value: 1999.99,
  date: makeFakeDate,
  resellerId: 'any_reseller_id',
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
