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

const uri = env.cashbackApi
const token = env.cashbackApiToken
const fakeRequestOptions = (): object => ({
  uri: uri + '?cpf=15350946056',
  headers: {
    contentType: 'application/json',
    token: token
  }
})

const makeSut = (): CashbackApi => {
  return new CashbackApi(uri, token)
}

describe('Cashback Api', () => {
  test('Should call get with correct values', async () => {
    const sut = makeSut()
    const getSpy = jest.spyOn(request, 'get')
    await sut.load('15350946056', 'cpf')
    expect(getSpy).toHaveBeenCalledWith(fakeRequestOptions())
  })

  test('Should throw if get throws', async () => {
    const sut = makeSut()
    jest.spyOn(request, 'get').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.load('15350946056', 'cpf')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an cashback on load success', async () => {
    const sut = makeSut()
    const cashback = await sut.load('15350946056', 'cpf')
    expect(cashback).toBeTruthy()
    expect(cashback.credit).toBeTruthy()
  })

  test('Should return null on get statusCode return different 200', async () => {
    const sut = makeSut()
    const res = JSON.stringify({ statusCode: 400 })
    jest.spyOn(request, 'get').mockResolvedValue(res)
    const cashback = await sut.load('15350946056', 'cpf')
    expect(cashback).toBeFalsy()
  })
})
