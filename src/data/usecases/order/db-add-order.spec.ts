import { DbAddOrder } from './db-add-order'
import { AddOrderModel, Status } from './db-add-order-protocols'

const makeStatus = (): Status => {
  class StatusStub implements Status {
    async get (socialSecurityNumber: string): Promise<string> {
      return Promise.resolve('any_status')
    }
  }
  return new StatusStub()
}

const makeFakeOrderData = (): AddOrderModel => ({
  code: 'any_code',
  value: 'any_value',
  date: 'any_date',
  socialSecurityNumber: 'any_social_security_number'
})

interface sutTypes {
  sut: DbAddOrder
  statusStub: Status
}

const makeSut = (): sutTypes => {
  const statusStub = makeStatus()
  const sut = new DbAddOrder(statusStub)
  return {
    sut,
    statusStub
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
})
