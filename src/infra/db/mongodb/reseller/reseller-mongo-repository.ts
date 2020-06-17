import { AddResellerRepository } from '@/data/protocols/db/reseller/add-reseller-repository'
import { AddResellerModel } from '@/domain/usecases/reseller/add-reseller'

import { ResellerModel } from '@/domain/models/reseller'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { LoadResellerByEmailRepository } from '@/data/protocols/db/reseller/load-reseller-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/reseller/update-access-token-repository'
import { LoadResellerByIdRepository } from '@/data/usecases/order/load-orders/db-load-orders-protocols'

export class ResellerMongoRepository implements AddResellerRepository, LoadResellerByEmailRepository, UpdateAccessTokenRepository, LoadResellerByIdRepository {
  async add (resellerData: AddResellerModel): Promise<ResellerModel> {
    const resellerCollection = await MongoHelper.getCollection('resellers')
    const result = await resellerCollection.insertOne(resellerData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<ResellerModel> {
    const resellerCollection = await MongoHelper.getCollection('resellers')
    const reseller = await resellerCollection.findOne({ email })
    return reseller && MongoHelper.map(reseller)
  }

  async loadById (resellerId: string): Promise<ResellerModel> {
    const resellerCollection = await MongoHelper.getCollection('resellers')
    const reseller = await resellerCollection.findOne({ _id: resellerId })
    return reseller && MongoHelper.map(reseller)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const resellerCollection = await MongoHelper.getCollection('resellers')
    await resellerCollection.updateOne({
      _id: id
    }, {
      $set: { accessToken: token }
    })
  }
}
