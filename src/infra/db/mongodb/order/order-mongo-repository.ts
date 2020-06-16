import { AddOrderRepository } from '@/data/protocols/db/order/add-order-repository'
import { LoadOrdersRepository } from '@/data/protocols/db/order/load-orders-repository'
import { AddOrderModel } from '@/domain/usecases/order/add-order'
import { OrderModel } from '@/domain/models/order'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

export class OrderMongoRepository implements AddOrderRepository, LoadOrdersRepository {
  async add (orderData: AddOrderModel): Promise<OrderModel> {
    const orderCollection = await MongoHelper.getCollection('orders')
    const result = await orderCollection.insertOne(orderData)
    return MongoHelper.map(result.ops[0])
  }

  async loadAll (): Promise<OrderModel[]> {
    const orderCollection = await MongoHelper.getCollection('orders')
    const orders = await orderCollection.aggregate([
      { $sort: { date: -1 } }
    ]).toArray()
    return MongoHelper.mapCollection(orders)
  }
}
