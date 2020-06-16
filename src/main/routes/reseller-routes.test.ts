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
      const password = await hash('any_password', 12)
      await resellerCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password'
        })
        .expect(401)
    })
  })

  describe('POST /reseller', () => {
    test('Should return 200 on add reseller', async () => {
      await request(app)
        .post('/api/reseller')
        .send({
          itr: 'any_social_security_number',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
        .expect(201)
    })

    test('Should return 400 on add reseller', async () => {
      await request(app)
        .post('/api/reseller')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
        .expect(400)
    })
  })
})
