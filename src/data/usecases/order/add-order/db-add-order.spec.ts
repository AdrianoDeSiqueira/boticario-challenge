import { DbAddOrder } from './db-add-order'
import { AddOrderModel, OrderModel, GetStatusHelper, GetCashbackHelper, GetCashbackModel, AddOrderRepository } from './db-add-order-protocols'

const makeFakeDate = new Date()

const makeStatus = (): GetStatusHelper => {
  class StatusStub implements GetStatusHelper {
    async get (itr: string): Promise<string> {
      return Promise.resolve('any_status')
    }
  }
  return new StatusStub()
}

const makeCashbackHelper = (): GetCashbackHelper => {
  class CashbackHelper implements GetCashbackHelper {
    async get (valuePurchase: number): Promise<GetCashbackModel> {
      return Promise.resolve({
        cashbackPerc: 10,
        cashbackValue: 100.00
      })
    }
  }
  return new CashbackHelper()
}

const makeAddOrderRepository = (): AddOrderRepository => {
  class AddOrderRepositoryStub implements AddOrderRepository {
    async add (orderData: AddOrderModel): Promise<OrderModel> {
      return Promise.resolve(makeFakeOrder())
    }
  }
  return new AddOrderRepositoryStub()
}

const makeFakeOrderData = (): AddOrderModel => ({
  code: 'any_code',
  value: 1999.99,
  date: makeFakeDate,
  itr: 'any_social_security_number'
})

const makeFakeOrder = (): OrderModel => ({
  id: 'any_id',
  code: 'any_code',
  value: 1999.99,
  date: makeFakeDate,
  itr: 'any_social_security_number',
  cashbackPerc: 10,
  cashbackValue: 100,
  status: 'any_status'
})

interface sutTypes {
  sut: DbAddOrder
  statusStub: GetStatusHelper
  cashbackStub: GetCashbackHelper
  addOrderRepositoryStub: AddOrderRepository
}

const makeSut = (): sutTypes => {
  const statusStub = makeStatus()
  const cashbackStub = makeCashbackHelper()
  const addOrderRepositoryStub = makeAddOrderRepository()
  const sut = new DbAddOrder(statusStub, cashbackStub, addOrderRepositoryStub)
  return {
    sut,
    statusStub,
    cashbackStub,
    addOrderRepositoryStub
  }
}

describe('DbAddOrder Usecase', () => {
  test('Should call Status with correct itr', async () => {
    const { sut, statusStub } = makeSut()
    const getSpy = jest.spyOn(statusStub, 'get')
    await sut.add(makeFakeOrderData())
    expect(getSpy).toHaveBeenCalledWith('any_social_security_number')
  })

  test('Should throw if Status throws', async () => {
    const { sut, statusStub } = makeSut()
    jest.spyOn(statusStub, 'get').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.add(makeFakeOrderData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Cashback with correct value', async () => {
    const { sut, cashbackStub } = makeSut()
    const getSpy = jest.spyOn(cashbackStub, 'get')
    await sut.add(makeFakeOrderData())
    expect(getSpy).toHaveBeenCalledWith(1999.99)
  })

  test('Should throw if Cashback throws', async () => {
    const { sut, cashbackStub } = makeSut()
    jest.spyOn(cashbackStub, 'get').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.add(makeFakeOrderData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddOrderRepository with correct values', async () => {
    const { sut, addOrderRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addOrderRepositoryStub, 'add')
    await sut.add(makeFakeOrderData())
    expect(addSpy).toHaveBeenCalledWith(Object.assign({}, makeFakeOrderData(), { status: 'any_status', cashbackPerc: 10, cashbackValue: 100 }))
  })

  test('Should throw if AddOrderRepository throws', async () => {
    const { sut, addOrderRepositoryStub } = makeSut()
    jest.spyOn(addOrderRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.add(makeFakeOrderData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an order on success', async () => {
    const { sut } = makeSut()
    const order = await sut.add(makeFakeOrderData())
    expect(order).toEqual(makeFakeOrder())
  })
})
