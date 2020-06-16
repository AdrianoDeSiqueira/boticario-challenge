import { ApiLoadCashback } from './api-load-cashback'
import { LoadCashbackApi, CashbackModel } from './api-load-cashback-protocols'

const makeLoadCashbackApiStub = (): LoadCashbackApi => {
  class LoadCashbackApiStub implements LoadCashbackApi {
    async load (itr: string): Promise<CashbackModel> {
      return Promise.resolve(makeFakeCashbackModel())
    }
  }
  return new LoadCashbackApiStub()
}

const makeFakeCashbackModel = (): CashbackModel => ({
  credit: 10000
})

type SutTypes = {
  sut: ApiLoadCashback
  loadCashbackApiStub: LoadCashbackApi
}

const makeSut = (): SutTypes => {
  const loadCashbackApiStub = makeLoadCashbackApiStub()
  const sut = new ApiLoadCashback(loadCashbackApiStub)
  return {
    sut,
    loadCashbackApiStub
  }
}

describe('ApiLoadCashback Usecase', () => {
  test('Should call LoadCashbackApi with correct itr', async () => {
    const { sut, loadCashbackApiStub } = makeSut()
    const loadSpy = jest.spyOn(loadCashbackApiStub, 'load')
    await sut.load('15350946056')
    expect(loadSpy).toHaveBeenCalledWith('15350946056')
  })

  test('Should throw if LoadCashbackApi throws', async () => {
    const { sut, loadCashbackApiStub } = makeSut()
    jest.spyOn(loadCashbackApiStub, 'load').mockReturnValueOnce(Promise.reject(Error()))
    const promise = sut.load('15350946056')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an cashback on success', async () => {
    const { sut } = makeSut()
    const cashback = await sut.load('15350946056')
    expect(cashback).toEqual(makeFakeCashbackModel())
  })
})
