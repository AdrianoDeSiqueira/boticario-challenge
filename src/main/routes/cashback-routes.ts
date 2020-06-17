import { Router } from 'express'
import { adapterRoute } from '@/main/adapters/express-route-adapter'
import { makeLoadCashbackController } from '@/main/factories/controller/cashback/load-cashback-factory'

export default (router: Router): void => {
  router.get('/cashback/:itr', adapterRoute(makeLoadCashbackController()))
}
