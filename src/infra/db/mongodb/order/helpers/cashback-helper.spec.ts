import { CashbackHelper } from './cashback-helper'

const makeSut = (): CashbackHelper => {
  return new CashbackHelper()
}

describe('Cashback Helper', () => {
  test('Should return 10% percentage', async () => {
    const sut = makeSut()
    const cashback = await sut.get(989.90)
    expect(cashback).toEqual({ cashbackPerc: 10, cashbackValue: 98.99 })
  })

  test('Should return 15% percentage', async () => {
    const sut = makeSut()
    const cashback = await sut.get(1245.90)
    expect(cashback).toEqual({ cashbackPerc: 15, cashbackValue: 186.88 })
  })

  test('Should return 20% percentage', async () => {
    const sut = makeSut()
    const cashback = await sut.get(1500.94)
    expect(cashback).toEqual({ cashbackPerc: 20, cashbackValue: 300.19 })
  })
})
