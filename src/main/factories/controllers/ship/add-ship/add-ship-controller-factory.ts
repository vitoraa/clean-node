import { AddShipController } from '@/presentation/controllers/ship/add-ship/add-ship-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddShip } from '@/main/factories/usecases/add-ship/db-add-ship'
import { makeAddShipValidation } from './add-ship-validation-factory'

export const makeAddShipController = (): Controller => {
  const addShipController = new AddShipController(makeDbAddShip(), makeAddShipValidation())
  return makeLogControllerDecorator(addShipController)
}
