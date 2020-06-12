import { OrderMongoRepository } from './order-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'

let orderCollection: Collection

describe('Order Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    orderCollection = await MongoHelper.getCollection('orders')
    await orderCollection.deleteMany({})
  })

  const makeSut = (): OrderMongoRepository => {
    return new OrderMongoRepository()
  }

  test('Should return an order on add success', async () => {
    const sut = makeSut()
    const reseller = await sut.add({
      code: 'any_code',
      value: 'any_value',
      date: 'any_date',
      socialSecurityNumber: 'any_social_security_number',
      status: 'any_status'
    })
    expect(reseller).toBeTruthy()
    expect(reseller.id).toBeTruthy()
    expect(reseller.code).toBe('any_code')
    expect(reseller.value).toBe('any_value')
    expect(reseller.date).toBe('any_date')
    expect(reseller.socialSecurityNumber).toBe('any_social_security_number')
    expect(reseller.status).toBe('any_status')
  })
})
