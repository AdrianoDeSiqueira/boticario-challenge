import { Router } from 'express'
import { adapterRoute } from '@/main/adapters/express-route-adapter'
import { makeAddOrderController } from '@/main/factories/order/add-order/add-order-factory'

export default (router: Router): void => {
  router.post('/order', adapterRoute(makeAddOrderController()))
}
