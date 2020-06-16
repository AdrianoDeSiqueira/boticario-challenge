import { CashbackApi } from './cashback-api'

const makeSut = (): CashbackApi => {
  return new CashbackApi()
}

describe('Cashback Api', () => {
  test('Should return an cashback on load success', async () => {
    const sut = makeSut()
    const cashback = await sut.load('15350946056')
    expect(cashback).toBeTruthy()
    expect(cashback.credit).toBeTruthy()
  })
})
