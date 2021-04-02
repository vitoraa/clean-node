import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddActivityController } from '../factories/controllers/activity/add-activity/add-activity-controller-factory'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/ships/:shipId/activity', auth, adaptRoute(makeAddActivityController()))
}
