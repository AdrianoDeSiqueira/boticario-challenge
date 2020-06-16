import { DbAddReseller } from './db-add-reseller'
import { AddResellerModel, ResellerModel, Hasher, AddResellerRepository } from './db-add-reseller-protocols'

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

const makeFakeResellerData = (): AddResellerModel => ({
  itr: 'any_social_security_number',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeFakeReseller = (): ResellerModel => ({
  id: 'any_id',
  itr: 'any_social_security_number',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

interface sutTypes {
  sut: DbAddReseller
  hasherStub: Hasher
  addResellerRepositoryStub: AddResellerRepository
}

const makeSut = (): sutTypes => {
  const hasherStub = makeHasher()
  const addResellerRepositoryStub = makeAddResellerRepository()
  const sut = new DbAddReseller(hasherStub, addResellerRepositoryStub)
  return {
    sut,
    hasherStub,
    addResellerRepositoryStub
  }
}

describe('DbAddReseller Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(makeFakeResellerData())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.add(makeFakeResellerData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddResellerRepository with correct values', async () => {
    const { sut, addResellerRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addResellerRepositoryStub, 'add')
    await sut.add(makeFakeResellerData())
    expect(addSpy).toHaveBeenCalledWith({
      itr: 'any_social_security_number',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password_hashed'
    })
  })

  test('Should throw if AddResellerRepository throws', async () => {
    const { sut, addResellerRepositoryStub } = makeSut()
    jest.spyOn(addResellerRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.add(makeFakeResellerData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an reseller on success', async () => {
    const { sut } = makeSut()
    const reseller = await sut.add(makeFakeResellerData())
    expect(reseller).toEqual(makeFakeReseller())
  })
})
