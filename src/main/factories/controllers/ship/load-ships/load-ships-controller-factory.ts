import { LoadShipsController } from '../../../../../presentation/controllers/ship/load-ships/load-ships-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbLoadShips } from '../../../usecases/load-ships/db-load-ships'
import { makeAddShipValidation } from '../add-ship/add-ship-validation-factory'

export const makeLoadShipsController = (): Controller => {
  const loadShipsController = new LoadShipsController(makeDbLoadShips(), makeAddShipValidation())
  return makeLogControllerDecorator(loadShipsController)
}
