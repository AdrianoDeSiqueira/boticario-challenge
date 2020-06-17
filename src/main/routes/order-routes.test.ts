import request from 'supertest'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { sign } from 'jsonwebtoken'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let orderCollection: Collection
let resellerCollection: Collection

interface SutTypes {
  accessToken: string
  id: string
}

const makeAccessToken = async (): Promise<SutTypes> => {
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
  return {
    accessToken,
    id
  }
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
      const { accessToken } = await makeAccessToken()
      await request(app)
        .post('/api/order')
        .set('x-access-token', accessToken)
        .send({
          itr: '527.378.250-32',
          value: 1999.99,
          code: 'N9TT-9G0A-B7FQ-RANC',
          date: '2020/06/13'
        })
        .expect(201)
    })

    test('Should return 400 on add order', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .post('/api/order')
        .set('x-access-token', accessToken)
        .send({
          itr: '527.378.250-32',
          value: 1999.99,
          date: new Date()
        })
        .expect(400)
    })
  })

  describe('GET /order', () => {
    test('Should return 200 on load orders', async () => {
      const { accessToken, id } = await makeAccessToken()
      await orderCollection.insertOne({
        itr: '527.378.250-32',
        code: 'N9TT-9G0A-B7FQ-RANC',
        value: 1999.99,
        date: '2020/06/13',
        resellerId: id,
        status: 'any_status'
      })
      await request(app)
        .get('/api/order')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  test('Should return 204 on load orders', async () => {
    const { accessToken } = await makeAccessToken()
    await request(app)
      .get('/api/order')
      .set('x-access-token', accessToken)
      .expect(204)
  })
})
