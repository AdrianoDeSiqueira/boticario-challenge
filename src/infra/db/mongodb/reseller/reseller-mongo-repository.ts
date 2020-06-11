import { AddResellerRepository } from '../../../../data/protocols/db/reseller/add-reseller-repository'
import { AddResellerModel } from '../../../../domain/usecases/reseller/add-reseller'
import { ResellerModel } from '../../../../domain/models/reseller'
import { MongoHelper } from '../helpers/mongo-helper'

export class ResellerMongoRepository implements AddResellerRepository {
  async add (resellerData: AddResellerModel): Promise<ResellerModel> {
    const resellerCollection = await MongoHelper.getCollection('resellers')
    const result = await resellerCollection.insertOne(resellerData)
    return MongoHelper.map(result.ops[0])
  }
}
