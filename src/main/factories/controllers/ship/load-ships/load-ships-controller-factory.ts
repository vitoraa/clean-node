import { LoadShipsController } from '@/presentation/controllers/ship/load-ships/load-ships-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadShips } from '@/main/factories/usecases/load-ships/db-load-ships'
import { makeLoadShipsValidation } from './load-ships-validation-factory'

export const makeLoadShipsController = (): Controller => {
  const loadShipsController = new LoadShipsController(makeDbLoadShips(), makeLoadShipsValidation())
  return makeLogControllerDecorator(loadShipsController)
}
