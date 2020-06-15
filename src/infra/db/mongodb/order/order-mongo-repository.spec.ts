import { OrderMongoRepository } from './order-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers'
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

  describe('add()', () => {
    test('Should return an order on add success', async () => {
      const sut = makeSut()
      const order = await sut.add({
        code: 'any_code',
        value: 'any_value',
        date: 'any_date',
        socialSecurityNumber: 'any_social_security_number',
        status: 'any_status'
      })
      expect(order).toBeTruthy()
      expect(order.id).toBeTruthy()
      expect(order.code).toBe('any_code')
      expect(order.value).toBe('any_value')
      expect(order.date).toBe('any_date')
      expect(order.socialSecurityNumber).toBe('any_social_security_number')
      expect(order.status).toBe('any_status')
    })
  })

  describe('loadAll()', () => {
    test('Should loadAll orders by socialSecurityNumber on success', async () => {
      await orderCollection.insertOne({
        code: 'any_code',
        value: 'any_value',
        date: 'any_date',
        socialSecurityNumber: 'any_social_security_number',
        status: 'any_status'
      })
      const sut = makeSut()
      const orders = await sut.loadAll()
      expect(orders).toBeTruthy()
      expect(orders[0].id).toBeTruthy()
      expect(orders[0].code).toBe('any_code')
      expect(orders[0].value).toBe('any_value')
      expect(orders[0].date).toBe('any_date')
      expect(orders[0].socialSecurityNumber).toBe('any_social_security_number')
      expect(orders[0].status).toBe('any_status')
    })

    test('Should loadAll returns null', async () => {
      const sut = makeSut()
      const orders = await sut.loadAll()
      expect(orders).toBeNull()
    })
  })
})
