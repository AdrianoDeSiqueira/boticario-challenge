import { Router } from 'express'
import { auth } from '@/main/middlewares/auth'
import { adapterRoute } from '@/main/adapters/express-route-adapter'
import { makeAddOrderController } from '@/main/factories/controller/order/add-order/add-order-factory'
import { makeLoadOrdersController } from '@/main/factories/controller/order/load-orders/load-orders-factory'

export default (router: Router): void => {
  router.get('/order', auth, adapterRoute(makeLoadOrdersController()))
  router.post('/order', auth, adapterRoute(makeAddOrderController()))
}
