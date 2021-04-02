import { DbLoadShipById } from '@/data/usecases/ship/load-ship-by-id/db-load-ship-by-id'
import { LoadShipById } from '@/domain/usecases/ship/load-ship-by-id'
import { ShipMongoRepository } from '@/infra/db/mongodb/ship/ship-mongo-repository'

export const makeDbLoadShipById = (): LoadShipById => {
  const shipMongoRepository = new ShipMongoRepository()
  return new DbLoadShipById(shipMongoRepository)
}
