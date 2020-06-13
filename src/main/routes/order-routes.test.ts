import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let orderCollection: Collection

describe('Order Routes', () => {
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

  describe('POST /order', () => {
    test('Should return 200 on add order', async () => {
      await request(app)
        .post('/api/order')
        .send({
          code: '1234567890',
          value: '1234,70',
          date: '2020/06/13',
          socialSecurityNumber: '26977287080'
        })
        .expect(201)
    })

    test('Should return 400 on add order', async () => {
      await request(app)
        .post('/api/order')
        .send({
          value: '1234,70',
          date: '2020/06/13',
          socialSecurityNumber: '326977287080'
        })
        .expect(400)
    })
  })
})
