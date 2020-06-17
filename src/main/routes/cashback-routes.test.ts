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
    resellerCollection = await MongoHelper.getCollection('resellers')
    await resellerCollection.deleteMany({})
  })

  describe('GET /cashback/:itr', () => {
    test('Should return 200 on load cashback', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/cashback/12312312323')
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
