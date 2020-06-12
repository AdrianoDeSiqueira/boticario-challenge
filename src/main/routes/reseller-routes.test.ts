import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
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

  describe('POST /reseller', () => {
    test('Should return 200 on add reseller', async () => {
      await request(app)
        .post('/api/reseller')
        .send({
          socialSecurityNumber: 'any_social_security_number',
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
