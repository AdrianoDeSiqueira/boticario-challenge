import { LoadCashbackController } from './load-cashback-controller'
import { HttpRequest, LoadCashback } from './load-cashback-controller-protocols'
import { CashbackModel } from '@/domain/models/cashback'

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
})
