import { AddResellerRepository } from '../../../../data/protocols/db/reseller/add-reseller-repository'
import { AddResellerModel } from '../../../../domain/usecases/reseller/add-reseller'

import { ResellerModel } from '../../../../domain/models/reseller'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/reseller/load-reseller-by-email-repository'

export class ResellerMongoRepository implements AddResellerRepository, LoadAccountByEmailRepository {
  async add (resellerData: AddResellerModel): Promise<ResellerModel> {
    const resellerCollection = await MongoHelper.getCollection('resellers')
    const result = await resellerCollection.insertOne(resellerData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<ResellerModel> {
    const accountCollection = await MongoHelper.getCollection('resellers')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }
}
