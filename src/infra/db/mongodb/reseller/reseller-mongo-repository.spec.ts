import { MongoHelper } from '../helpers/mongo-helper'
import { Collection } from 'mongodb'
import { ResellerMongoRepository } from './reseller-mongo-repository'

let resellerCollection: Collection

describe('Reseller Mongo Repository', () => {
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

  const makeSut = (): ResellerMongoRepository => {
    return new ResellerMongoRepository()
  }

  test('Should return an reseller on add success', async () => {
    const sut = makeSut()
    const reseller = await sut.add({
      socialSecurityNumber: 'any_social_security_number',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(reseller).toBeTruthy()
    expect(reseller.id).toBeTruthy()
    expect(reseller.socialSecurityNumber).toBe('any_social_security_number')
    expect(reseller.name).toBe('any_name')
    expect(reseller.email).toBe('any_email@mail.com')
    expect(reseller.password).toBe('any_password')
  })
})
