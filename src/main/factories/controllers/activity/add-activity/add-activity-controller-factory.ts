import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddActivity } from '@/main/factories/usecases/add-activity/db-add-activity'
import { makeDbLoadShipById } from '@/main/factories/usecases/load-ship-by-id/db-load-ship-by-id'
import { AddActivityController } from '@/presentation/controllers/activity/add-activity-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddActivityValidation } from './add-activity-validation-factory'

export const makeAddActivityController = (): Controller => {
  const addActivityController = new AddActivityController(makeDbAddActivity(), makeAddActivityValidation(), makeDbLoadShipById())
  return makeLogControllerDecorator(addActivityController)
}
