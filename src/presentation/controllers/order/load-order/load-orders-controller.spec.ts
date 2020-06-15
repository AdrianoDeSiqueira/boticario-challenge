import { LoadOrdersController } from './load-orders-controller'
import { HttpRequest, LoadOrders } from './load-orders-controller-protocols'
import { OrderModel } from '../add-order/add-order-controller-protocols'

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
})
