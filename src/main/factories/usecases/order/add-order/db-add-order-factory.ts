import env from '@/main/config/env'
import { DbAddOrder } from '@/data/usecases/order/add-order/db-add-order'
import { AddOrder } from '@/domain/usecases/order/add-order'
import { StatusHelper } from '@/infra/db/mongodb/order/helpers/status-helper'
import { CashbackHelper } from '@/infra/db/mongodb/order/helpers/cashback-helper'
import { OrderMongoRepository } from '@/infra/db/mongodb/order/order-mongo-repository'

export const makeDbAddOrder = (): AddOrder => {
  const sITR = env.specificITR
  const statusHelper = new StatusHelper(sITR)
  const cashbackHelper = new CashbackHelper()
  const orderMongoRepository = new OrderMongoRepository()
  return new DbAddOrder(statusHelper, cashbackHelper, orderMongoRepository)
}
