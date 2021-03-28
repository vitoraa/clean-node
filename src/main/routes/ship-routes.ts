import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddShipController } from '../factories/controllers/ship/add-ship/add-ship-controller-factory'
import { makeLoadShipsController } from '../factories/controllers/ship/load-ships/load-ships-controller-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/ships', adminAuth, adaptRoute(makeAddShipController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/ships', auth, adaptRoute(makeLoadShipsController()))
}
