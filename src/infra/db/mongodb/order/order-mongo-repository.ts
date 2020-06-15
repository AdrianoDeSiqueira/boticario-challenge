import { AddOrderRepository } from '@/data/protocols/db/order/add-order-repository'
import { LoadOrdersRepository } from '@/data/protocols/db/order/load-orders-repository'
import { AddOrderModel } from '@/domain/usecases/order/add-order'
import { OrderModel } from '@/domain/models/order'
import { MongoHelper, QueryBuilder } from '@/infra/db/mongodb/helpers'

export class OrderMongoRepository implements AddOrderRepository, LoadOrdersRepository {
  async add (orderData: AddOrderModel): Promise<OrderModel> {
    const orderCollection = await MongoHelper.getCollection('orders')
    const result = await orderCollection.insertOne(orderData)
    return MongoHelper.map(result.ops[0])
  }

  async loadAll (socialSecurityNumber: string): Promise<OrderModel[]> {
    const orderCollection = await MongoHelper.getCollection('orders')
    const query = new QueryBuilder()
      .match({
        socialSecurityNumber: socialSecurityNumber
      })
      .build()
    const orders = await orderCollection.aggregate(query).toArray()
    return orders.length ? MongoHelper.mapCollection(orders) : null
  }
}
