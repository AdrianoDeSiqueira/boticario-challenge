import { AddOrderRepository } from '../../../../data/protocols/db/order/add-order-repository'
import { AddOrderModel } from '../../../../domain/usecases/order/add-order'
import { OrderModel } from '../../../../domain/models/order'
import { MongoHelper } from '../helpers/mongo-helper'

export class OrderMongoRepository implements AddOrderRepository {
  async add (orderData: AddOrderModel): Promise<OrderModel> {
    const orderCollection = await MongoHelper.getCollection('orders')
    const result = await orderCollection.insertOne(orderData)
    return MongoHelper.map(result.ops[0])
  }
}
