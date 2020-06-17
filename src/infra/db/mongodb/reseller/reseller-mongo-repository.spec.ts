import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { ResellerMongoRepository } from './reseller-mongo-repository'

let resellerCollection: Collection

describe('ResellerMongo Repository', () => {
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

  describe('add()', () => {
    test('Should return an reseller on add success', async () => {
      const sut = makeSut()
      const reseller = await sut.add({
        itr: 'any_social_security_number',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(reseller).toBeTruthy()
      expect(reseller.id).toBeTruthy()
      expect(reseller.itr).toBe('any_social_security_number')
      expect(reseller.name).toBe('any_name')
      expect(reseller.email).toBe('any_email@mail.com')
      expect(reseller.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an reseller on loadByEmail success', async () => {
      const sut = makeSut()
      await resellerCollection.insertOne({
        itr: 'any_social_security_number',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const reseller = await sut.loadByEmail('any_email@mail.com')
      expect(reseller).toBeTruthy()
      expect(reseller.id).toBeTruthy()
      expect(reseller.itr).toBe('any_social_security_number')
      expect(reseller.name).toBe('any_name')
      expect(reseller.email).toBe('any_email@mail.com')
      expect(reseller.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const reseller = await sut.loadByEmail('any_email@mail.com')
      expect(reseller).toBeFalsy()
    })
  })

  describe('loadById()', () => {
    test('Should return an reseller on loadById success', async () => {
      const sut = makeSut()
      const res = await resellerCollection.insertOne({
        itr: 'any_social_security_number',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const fakeReseller = res.ops[0]
      const reseller = await sut.loadById(fakeReseller._id)
      expect(reseller).toBeTruthy()
      expect(reseller.id).toBeTruthy()
      expect(reseller.itr).toBe('any_social_security_number')
      expect(reseller.name).toBe('any_name')
      expect(reseller.email).toBe('any_email@mail.com')
      expect(reseller.password).toBe('any_password')
    })

    test('Should return null if loadById fails', async () => {
      const sut = makeSut()
      const reseller = await sut.loadById('any_id')
      expect(reseller).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the reseller accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const res = await resellerCollection.insertOne({
        itr: 'any_social_security_number',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const fakeReseller = res.ops[0]
      expect(fakeReseller.accessToken).toBeFalsy()
      await sut.updateAccessToken(fakeReseller._id, 'any_token')
      const reseller = await resellerCollection.findOne({ _id: fakeReseller._id })
      expect(reseller).toBeTruthy()
      expect(reseller.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken()', () => {
    test('Should return an reseller on loadByToken', async () => {
      const sut = makeSut()
      await resellerCollection.insertOne({
        itr: 'any_social_security_number',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const reseller = await sut.loadByToken('any_token')
      expect(reseller).toBeTruthy()
      expect(reseller.id).toBeTruthy()
      expect(reseller.itr).toBe('any_social_security_number')
      expect(reseller.name).toBe('any_name')
      expect(reseller.email).toBe('any_email@mail.com')
      expect(reseller.password).toBe('any_password')
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const reseller = await sut.loadByToken('any_token')
      expect(reseller).toBeFalsy()
    })
  })
})
