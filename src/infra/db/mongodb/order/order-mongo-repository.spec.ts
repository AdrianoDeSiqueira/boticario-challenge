import { OrderMongoRepository } from './order-mongo-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { Collection } from 'mongodb'

const makeFakeDate = new Date()

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
        value: 1999.99,
        date: makeFakeDate,
        itr: 'any_social_security_number',
        status: 'any_status'
      })
      expect(order).toBeTruthy()
      expect(order.id).toBeTruthy()
      expect(order.code).toBe('any_code')
      expect(order.value).toBe(1999.99)
      expect(order.date).toBe(makeFakeDate)
      expect(order.itr).toBe('any_social_security_number')
      expect(order.status).toBe('any_status')
    })
  })

  describe('loadAll()', () => {
    test('Should loadAll orders on success', async () => {
      await orderCollection.insertOne({
        code: 'any_code',
        value: 1999.99,
        date: makeFakeDate,
        itr: 'any_social_security_number',
        status: 'any_status'
      })
      const sut = makeSut()
      const orders = await sut.loadAll()
      expect(orders).toBeTruthy()
      expect(orders[0].id).toBeTruthy()
      expect(orders[0].code).toBe('any_code')
      expect(orders[0].value).toBe(1999.99)
      expect(orders[0].date).toStrictEqual(makeFakeDate)
      expect(orders[0].itr).toBe('any_social_security_number')
      expect(orders[0].status).toBe('any_status')
    })

    test('Should loadAll returns null', async () => {
      const sut = makeSut()
      const orders = await sut.loadAll()
      const count = orders.length
      expect(count).toBe(0)
    })
  })
})
