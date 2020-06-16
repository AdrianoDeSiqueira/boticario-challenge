import { CashbackHelper } from './cashback-helper'

const makeSut = (): CashbackHelper => {
  return new CashbackHelper()
}

describe('Cashback Helper', () => {
  test('Should return 10% percentage', async () => {
    const sut = makeSut()
    const cashback = await sut.get(989.90)
    expect(cashback).toEqual({ perc: 10, value: 98.99 })
  })

  test('Should return 15% percentage', async () => {
    const sut = makeSut()
    const cashback = await sut.get(1245.90)
    expect(cashback).toEqual({ perc: 15, value: 186.885 })
  })
})
