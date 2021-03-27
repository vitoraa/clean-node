import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddShipController } from '../factories/controllers/ship/add-ship/add-ship-controller-factory'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/ships', adminAuth, adaptRoute(makeAddShipController()))
}
