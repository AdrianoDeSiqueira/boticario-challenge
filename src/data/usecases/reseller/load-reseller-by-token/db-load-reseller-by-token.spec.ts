import { DbLoadResellerByToken } from './db-load-reseller-by-token'
import { Decrypter, LoadResellerByTokenRepository, ResellerModel } from './db-load-reseller-by-token-protocols'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (token: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

const makeLoadResellerByTokenRepository = (): LoadResellerByTokenRepository => {
  class LoadResellerByTokenRepositoryStub implements LoadResellerByTokenRepository {
    async loadByToken (token: string): Promise<ResellerModel> {
      return Promise.resolve(makeFakeReseller())
    }
  }
  return new LoadResellerByTokenRepositoryStub()
}

const makeFakeReseller = (): ResellerModel => ({
  id: 'any_id',
  itr: 'any_social_security_number',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

interface SutTypes {
  sut: DbLoadResellerByToken
  decrypterStub: Decrypter
  loadResellerByTokenRepositoryStub: LoadResellerByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadResellerByTokenRepositoryStub = makeLoadResellerByTokenRepository()
  const sut = new DbLoadResellerByToken(decrypterStub, loadResellerByTokenRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadResellerByTokenRepositoryStub
  }
}

describe('DbLoadResellerByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const reseller = await sut.load('any_token')
    expect(reseller).toBeNull()
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.load('any_token')
    await expect(promise).rejects.toThrow()
  })

  test('Should call LoadResellerByTokenRepository with correct values', async () => {
    const { sut, loadResellerByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadResellerByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if LoadResellerByTokenRepository returns null', async () => {
    const { sut, loadResellerByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadResellerByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })
})
