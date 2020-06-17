import request from 'supertest'
import { hash } from 'bcrypt'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let resellerCollection: Collection

describe('Reseller Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    resellerCollection = await MongoHelper.getCollection('resellers')
    await resellerCollection.deleteMany({})
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('Boticario2020', 12)
      await resellerCollection.insertOne({
        itr: '99999999999',
        name: 'Adriano Nunes de Siqueira',
        email: 'adriano.siqueira@grupoboticario.com.br',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'adriano.siqueira@grupoboticario.com.br',
          password: 'Boticario2020'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'adriano.siqueira@grupoboticario.com.br',
          password: 'Boticario2020'
        })
        .expect(401)
    })
  })

  describe('POST /reseller', () => {
    test('Should return 200 on add reseller', async () => {
      await request(app)
        .post('/api/reseller')
        .send({
          itr: '99999999999',
          name: 'Adriano Nunes de Siqueira',
          email: 'adriano.siqueira@grupoboticario.com.br',
          password: 'Boticario2020',
          passwordConfirmation: 'Boticario2020'
        })
        .expect(201)
    })

    test('Should return 400 on add reseller', async () => {
      await request(app)
        .post('/api/reseller')
        .send({
          name: 'Adriano Nunes de Siqueira',
          email: 'adriano.siqueira@grupoboticario.com.br',
          password: 'Boticario2020',
          passwordConfirmation: 'Boticario2020'
        })
        .expect(400)
    })
  })
})
