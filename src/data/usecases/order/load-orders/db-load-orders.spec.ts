import { DbLoadOrders } from './db-load-orders'
import { LoadResellerByIdRepository } from './db-load-orders-protocols'
import { ResellerModel } from '../../../../domain/models/reseller'

const makeLoadResellerByIdRepository = (): LoadResellerByIdRepository => {
  class LoadResellerByIdRepositoryStub implements LoadResellerByIdRepository {
    async loadById (id: string): Promise<ResellerModel> {
      return makeFakeReseller()
    }
  }
  return new LoadResellerByIdRepositoryStub()
}

const makeFakeReseller = (): ResellerModel => ({
  id: 'any_id',
  socialSecurityNumber: 'any_social_security_number',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

type SutTypes = {
  sut: DbLoadOrders
  loadResellerByIdRepositoryStub: LoadResellerByIdRepository
}

const makeSut = (): SutTypes => {
  const loadResellerByIdRepositoryStub = makeLoadResellerByIdRepository()
  const sut = new DbLoadOrders(loadResellerByIdRepositoryStub)
  return {
    sut,
    loadResellerByIdRepositoryStub
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
})
