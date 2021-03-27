import { DbAddShip } from '../../../../data/usecases/add-ship/db-add-ship'
import { AddShip } from '../../../../domain/usecases/add-ship'
import { ShipMongoRepository } from '../../../../infra/db/mongodb/ship/ship-mongo-repository'

export const makeDbAddShip = (): AddShip => {
  const shipMongoRepository = new ShipMongoRepository()
  return new DbAddShip(shipMongoRepository, shipMongoRepository)
}