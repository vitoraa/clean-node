import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddShipController } from '../factories/controllers/ship/add-ship/add-ship-controller-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/ships', adaptRoute(makeAddShipController()))
}
