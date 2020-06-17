import request from 'supertest'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { sign } from 'jsonwebtoken'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let orderCollection: Collection
let resellerCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const res = await resellerCollection.insertOne({
    itr: '341.273.118-86',
    name: 'Adriano Nunes de Siqueira',
    email: 'adriano.siqueira@grupoboticario.com.br',
    password: 'Boticario2020'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await resellerCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

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
    resellerCollection = await MongoHelper.getCollection('resellers')
    await resellerCollection.deleteMany({})
  })

  describe('POST /order', () => {
    test('Should return 201 on add order', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/order')
        .set('x-access-token', accessToken)
        .send({
          code: '1234567890',
          value: '1234,70',
          date: '2020/06/13',
          itr: '26977287080'
        })
        .expect(201)
    })

    test('Should return 400 on add order', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/order')
        .set('x-access-token', accessToken)
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
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/order')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  test('Should return 204 on load orders', async () => {
    const accessToken = await makeAccessToken()
    await request(app)
      .get('/api/order')
      .set('x-access-token', accessToken)
      .expect(204)
  })
})
