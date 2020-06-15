import { DbLoadOrders } from './db-load-orders'
import { LoadResellerByIdRepository, LoadOrdersRepository } from './db-load-orders-protocols'
import { ResellerModel } from '../../../../domain/models/reseller'
import { OrderModel } from '../../../../domain/models/order'

const makeLoadResellerByIdRepository = (): LoadResellerByIdRepository => {
  class LoadResellerByIdRepositoryStub implements LoadResellerByIdRepository {
    async loadById (id: string): Promise<ResellerModel> {
      return makeFakeReseller()
    }
  }
  return new LoadResellerByIdRepositoryStub()
}

const makeLoadOrdersRepository = (): LoadOrdersRepository => {
  class LoadOrdersRepositoryStub implements LoadOrdersRepository {
    async loadAll (socialSecurityNumber: string): Promise<OrderModel[]> {
      return makeFakeOrderModels()
    }
  }
  return new LoadOrdersRepositoryStub()
}

const makeFakeReseller = (): ResellerModel => ({
  id: 'any_id',
  socialSecurityNumber: 'any_social_security_number',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

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

type SutTypes = {
  sut: DbLoadOrders
  loadResellerByIdRepositoryStub: LoadResellerByIdRepository
  loadOrdersRepositoryStub: LoadOrdersRepository
}

const makeSut = (): SutTypes => {
  const loadResellerByIdRepositoryStub = makeLoadResellerByIdRepository()
  const loadOrdersRepositoryStub = makeLoadOrdersRepository()
  const sut = new DbLoadOrders(loadResellerByIdRepositoryStub, loadOrdersRepositoryStub)
  return {
    sut,
    loadResellerByIdRepositoryStub,
    loadOrdersRepositoryStub
  }
}

describe('DbLoadOrders Usecase', () => {
  test('Should call LoadResellerByIdRepository with correct id', async () => {
    const { sut, loadResellerByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadResellerByIdRepositoryStub, 'loadById')
    const resellerId = 'any_reseller_id'
    await sut.load(resellerId)
    expect(loadByIdSpy).toHaveBeenCalledWith(resellerId)
  })

  test('Should throw if LoadResellerByIdRepository throws', async () => {
    const { sut, loadResellerByIdRepositoryStub } = makeSut()
    jest.spyOn(loadResellerByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.reject(Error()))
    const resellerId = 'any_reseller_id'
    const promise = sut.load(resellerId)
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadResellerByIdRepository returns null', async () => {
    const { sut, loadResellerByIdRepositoryStub } = makeSut()
    jest.spyOn(loadResellerByIdRepositoryStub, 'loadById').mockReturnValueOnce(null)
    const resellerId = 'any_reseller_id'
    const reseller = await sut.load(resellerId)
    expect(reseller).toBeNull()
  })

  test('Should call LoadOrdersRepository with correct social security number', async () => {
    const { sut, loadOrdersRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadOrdersRepositoryStub, 'loadAll')
    const resellerId = 'any_reseller_id'
    await sut.load(resellerId)
    expect(loadAllSpy).toHaveBeenCalledWith('any_social_security_number')
  })
})
