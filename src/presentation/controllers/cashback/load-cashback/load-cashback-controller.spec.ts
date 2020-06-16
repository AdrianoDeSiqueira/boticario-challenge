import { LoadCashbackController } from './load-cashback-controller'
import { HttpRequest, LoadCashback } from './load-cashback-controller-protocols'
import { CashbackModel } from '@/domain/models/cashback'
import { serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { ServerError } from '@/presentation/errors'

const makeLoadCashback = (): LoadCashback => {
  class LoadCashbackStub implements LoadCashback {
    async load (itr: string): Promise<CashbackModel> {
      return Promise.resolve(makeFakeCashbackModel())
    }
  }
  return new LoadCashbackStub()
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    itr: '12312312323'
  }
})

const makeFakeCashbackModel = (): CashbackModel => ({
  credit: 2345
})

type SutTypes = {
  sut: LoadCashbackController
  loadCashbackStub: LoadCashback
}

const makeSut = (): SutTypes => {
  const loadCashbackStub = makeLoadCashback()
  const sut = new LoadCashbackController(loadCashbackStub)
  return {
    sut,
    loadCashbackStub
  }
}

describe('LoadCashback Controller', () => {
  test('Should call LoadCashback with correct value', async () => {
    const { sut, loadCashbackStub } = makeSut()
    const loadSpy = jest.spyOn(loadCashbackStub, 'load')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.params.itr)
  })

  test('Should return 500 if LoadCashback throws', async () => {
    const { sut, loadCashbackStub } = makeSut()
    jest.spyOn(loadCashbackStub, 'load').mockImplementationOnce(async () => {
      return Promise.reject(Error())
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 204 if LoadCashback returns empty', async () => {
    const { sut, loadCashbackStub } = makeSut()
    jest.spyOn(loadCashbackStub, 'load').mockReturnValueOnce(Promise.resolve(null))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
