import { DbLoadOrders } from './db-load-orders'
import { LoadOrdersRepository, OrderModel } from './db-load-orders-protocols'

const makeFakeDate = new Date()

const makeLoadOrdersRepository = (): LoadOrdersRepository => {
  class LoadOrdersRepositoryStub implements LoadOrdersRepository {
    async loadAll (): Promise<OrderModel[]> {
      return makeFakeOrderModels()
    }
  }
  return new LoadOrdersRepositoryStub()
}

const makeFakeOrderModels = (): OrderModel[] => [
  makeFakeOrderModel(),
  makeFakeOrderModel()
]

const makeFakeOrderModel = (): OrderModel => ({
  id: 'any_id',
  itr: '99999999999',
  code: 'any_code',
  value: 1999.99,
  date: makeFakeDate,
  resellerId: 'any_reseller_id',
  status: 'any_status'
})

type SutTypes = {
  sut: DbLoadOrders
  loadOrdersRepositoryStub: LoadOrdersRepository
}

const makeSut = (): SutTypes => {
  const loadOrdersRepositoryStub = makeLoadOrdersRepository()
  const sut = new DbLoadOrders(loadOrdersRepositoryStub)
  return {
    sut,
    loadOrdersRepositoryStub
  }
}

describe('DbLoadOrders Usecase', () => {
  test('Should throw if LoadOrdersRepository throws', async () => {
    const { sut, loadOrdersRepositoryStub } = makeSut()
    jest.spyOn(loadOrdersRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.load('any_reseller_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadOrdersRepository returns null', async () => {
    const { sut, loadOrdersRepositoryStub } = makeSut()
    jest.spyOn(loadOrdersRepositoryStub, 'loadAll').mockReturnValueOnce(null)
    const result = await sut.load('any_reseller_id')
    expect(result).toBeNull()
  })

  test('Should return a orders on success', async () => {
    const { sut } = makeSut()
    const orders = await sut.load('any_reseller_id')
    expect(orders).toEqual(makeFakeOrderModels())
  })
})
