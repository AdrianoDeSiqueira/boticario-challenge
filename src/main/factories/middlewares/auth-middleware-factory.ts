import { makeDbLoadResellerByToken } from '@/main/factories/usecases/reseller/load-reseller-by-token/db-load-reseller-by-token-factory'
import { Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeDbLoadResellerByToken())
}
