import { DbAddOrder } from './db-add-order'
import { AddOrderModel, OrderModel, Status, AddOrderRepository } from './db-add-order-protocols'

const makeStatus = (): Status => {
  class StatusStub implements Status {
    async get (socialSecurityNumber: string): Promise<string> {
      return Promise.resolve('any_status')
    }
  }
  return new StatusStub()
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
  value: 'any_value',
  date: 'any_date',
  socialSecurityNumber: 'any_social_security_number'
})

const makeFakeOrder = (): OrderModel => ({
  id: 'any_id',
  code: 'any_code',
  value: 'any_value',
  date: 'any_date',
  socialSecurityNumber: 'any_social_security_number',
  status: 'any_status'
})

interface sutTypes {
  sut: DbAddOrder
  statusStub: Status
  addOrderRepositoryStub: AddOrderRepository
}

const makeSut = (): sutTypes => {
  const statusStub = makeStatus()
  const addOrderRepositoryStub = makeAddOrderRepository()
  const sut = new DbAddOrder(statusStub, addOrderRepositoryStub)
  return {
    sut,
    statusStub,
    addOrderRepositoryStub
  }
}

describe('DbAddOrder Usecase', () => {
  test('Should call Status with correct social security number', async () => {
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

  test('Should call AddOrderRepository with correct values', async () => {
    const { sut, addOrderRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addOrderRepositoryStub, 'add')
    await sut.add(makeFakeOrderData())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'any_code',
      value: 'any_value',
      date: 'any_date',
      socialSecurityNumber: 'any_social_security_number',
      status: 'any_status'
    })
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
