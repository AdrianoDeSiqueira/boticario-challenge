import { DbAddReseller } from './db-add-reseller'
import { AddResellerModel, Hasher } from './db-add-reseller-protocols'

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('any_password_hashed')
    }
  }
  return new HasherStub()
}

const makeFakeResellerData = (): AddResellerModel => ({
  socialSecurityNumber: 'any_social_security_number',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

interface sutTypes {
  sut: DbAddReseller
  hasherStub: Hasher
}

const makeSut = (): sutTypes => {
  const hasherStub = makeHasher()
  const sut = new DbAddReseller(hasherStub)
  return {
    sut,
    hasherStub
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
})
