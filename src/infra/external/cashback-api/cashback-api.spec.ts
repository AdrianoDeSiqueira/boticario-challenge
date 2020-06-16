import { CashbackApi } from './cashback-api'
import request from 'request-promise-native'
import env from '@/main/config/env'

jest.mock('request-promise-native', () => ({
  async get (): Promise<string> {
    const res = {
      statusCode: 200,
      body: {
        credit: 1000
      }
    }
    return Promise.resolve(JSON.stringify(res))
  }
}))

const fakeRequestOptions = (): object => ({
  uri: env.cashbackApi + '?cpf=15350946056',
  headers: {
    contentType: 'application/json',
    token: env.cashbackApiToken
  }
})

const makeSut = (): CashbackApi => {
  return new CashbackApi()
}

describe('Cashback Api', () => {
  test('Should call get with correct values', async () => {
    const sut = makeSut()
    const getSpy = jest.spyOn(request, 'get')
    await sut.load('15350946056')
    expect(getSpy).toHaveBeenCalledWith(fakeRequestOptions())
  })

  test('Should throw if get throws', async () => {
    const sut = makeSut()
    jest.spyOn(request, 'get').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.load('15350946056')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an cashback on load success', async () => {
    const sut = makeSut()
    const cashback = await sut.load('15350946056')
    expect(cashback).toBeTruthy()
    expect(cashback.credit).toBeTruthy()
  })
})
