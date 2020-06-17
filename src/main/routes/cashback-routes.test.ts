import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let orderCollection: Collection

describe('Cashback Routes', () => {
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

  describe('GET /cashback/:itr', () => {
    test('Should return 200 on load cashback', async () => {
      await request(app)
        .get('/api/cashback/12312312323')
        .expect(200)
    })
  })
})
