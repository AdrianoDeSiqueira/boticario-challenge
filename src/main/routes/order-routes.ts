import { Router } from 'express'
import { adapterRoute } from '@/main/adapters/express-route-adapter'
import { makeAddOrderController } from '@/main/factories/order/add-order/add-order-factory'
import { makeLoadOrdersController } from '@/main/factories/order/load-orders/load-orders-factory'

export default (router: Router): void => {
  router.get('/order', adapterRoute(makeLoadOrdersController()))
  router.post('/order', adapterRoute(makeAddOrderController()))
}
