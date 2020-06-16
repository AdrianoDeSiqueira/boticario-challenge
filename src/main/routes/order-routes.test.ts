import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
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
    test('Should return 201 on add order', async () => {
      await request(app)
        .post('/api/order')
        .send({
          code: '1234567890',
          value: '1234,70',
          date: '2020/06/13',
          itr: '26977287080'
        })
        .expect(201)
    })

    test('Should return 400 on add order', async () => {
      await request(app)
        .post('/api/order')
        .send({
          value: 1999.99,
          date: new Date(),
          itr: '326977287080'
        })
        .expect(400)
    })
  })

  describe('POST /get', () => {
    test('Should return 200 on load orders', async () => {
      await orderCollection.insertOne({
        id: 'any_id',
        code: 'any_code',
        value: 1999.99,
        date: new Date(),
        itr: 'any_social_security_number',
        status: 'any_status'
      })
      await request(app)
        .get('/api/order')
        .expect(200)
    })
  })

  test('Should return 204 on load orders', async () => {
    await request(app)
      .get('/api/order')
      .expect(204)
  })
})
