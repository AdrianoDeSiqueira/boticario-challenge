import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let testCollection = await sut.getCollection('tests')
    expect(testCollection).toBeTruthy()
    await sut.disconnect()
    testCollection = await sut.getCollection('tests')
    expect(testCollection).toBeTruthy()
  })
})
