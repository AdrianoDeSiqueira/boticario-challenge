import { DbAddReseller } from './db-add-reseller'
import { AddResellerModel, ResellerModel, Hasher, AddResellerRepository } from './db-add-reseller-protocols'
import { LoadResellerByEmailRepository } from '../../authentication/db-authentication-protocols'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('any_password_hashed')
    }
  }
  return new HasherStub()
}

const makeAddResellerRepository = (): AddResellerRepository => {
  class AddResellerRepositoryStub implements AddResellerRepository {
    async add (resellerData: AddResellerModel): Promise<ResellerModel> {
      return Promise.resolve(makeFakeReseller())
    }
  }
  return new AddResellerRepositoryStub()
}

const makeLoadResellerByEmailRepository = (): LoadResellerByEmailRepository => {
  class LoadResellerByEmailRepositoryStub implements LoadResellerByEmailRepository {
    async loadByEmail (email: string): Promise<ResellerModel> {
      return Promise.resolve(makeFakeReseller())
    }
  }
  return new LoadResellerByEmailRepositoryStub()
}

const makeFakeResellerData = (): AddResellerModel => ({
  itr: '99999999999',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeFakeReseller = (): ResellerModel => ({
  id: 'any_id',
  itr: '99999999999',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

interface sutTypes {
  sut: DbAddReseller
  hasherStub: Hasher
  addResellerRepositoryStub: AddResellerRepository
  loadResellerByEmailRepositoryStub: LoadResellerByEmailRepository
}

const makeSut = (): sutTypes => {
  const hasherStub = makeHasher()
  const addResellerRepositoryStub = makeAddResellerRepository()
  const loadResellerByEmailRepositoryStub = makeLoadResellerByEmailRepository()
  const sut = new DbAddReseller(hasherStub, addResellerRepositoryStub, loadResellerByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addResellerRepositoryStub,
    loadResellerByEmailRepositoryStub
  }
}

describe('DbAddReseller Usecase', () => {
  test('Should call LoadResellerByEmailRepository with correct password', async () => {
    const { sut, loadResellerByEmailRepositoryStub } = makeSut()
    const spyLoadEmail = jest.spyOn(loadResellerByEmailRepositoryStub, 'loadByEmail')
    await sut.add(makeFakeResellerData())
    expect(spyLoadEmail).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadResellerByEmailRepository throws', async () => {
    const { sut, loadResellerByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadResellerByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.add(makeFakeResellerData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub, loadResellerByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadResellerByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeResellerData())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub, loadResellerByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadResellerByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.add(makeFakeResellerData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddResellerRepository with correct values', async () => {
    const { sut, addResellerRepositoryStub, loadResellerByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadResellerByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const addSpy = jest.spyOn(addResellerRepositoryStub, 'add')
    await sut.add(makeFakeResellerData())
    expect(addSpy).toHaveBeenCalledWith({
      itr: '99999999999',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password_hashed'
    })
  })

  test('Should throw if AddResellerRepository throws', async () => {
    const { sut, addResellerRepositoryStub, loadResellerByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadResellerByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    jest.spyOn(addResellerRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.add(makeFakeResellerData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an reseller on success', async () => {
    const { sut, loadResellerByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadResellerByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const reseller = await sut.add(makeFakeResellerData())
    expect(reseller).toEqual(makeFakeReseller())
  })
})
