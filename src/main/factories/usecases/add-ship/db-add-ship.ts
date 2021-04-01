import { DbAddShip } from '@/data/usecases/ship/add-ship/db-add-ship'
import { AddShip } from '@/domain/usecases/ship/add-ship'
import { ShipMongoRepository } from '@/infra/db/mongodb/ship/ship-mongo-repository'

export const makeDbAddShip = (): AddShip => {
  const shipMongoRepository = new ShipMongoRepository()
  return new DbAddShip(shipMongoRepository, shipMongoRepository)
}
