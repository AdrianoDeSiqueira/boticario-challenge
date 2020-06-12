import { Router } from 'express'
import { adapterRoute } from '../adapters/express-route-adapter'
import { makeAddResellerController } from '../factories/reseller/add-reseller-factory'

export default (router: Router): void => {
  router.post('/reseller', adapterRoute(makeAddResellerController()))
}
