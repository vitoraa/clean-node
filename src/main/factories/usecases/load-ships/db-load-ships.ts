import { DbLoadShips } from '@/data/usecases/ship/load-ships/db-load-ships'
import { LoadShips } from '@/domain/usecases/ship/load-ships'
import { ShipMongoRepository } from '@/infra/db/mongodb/ship/ship-mongo-repository'

export const makeDbLoadShips = (): LoadShips => {
  const shipMongoRepository = new ShipMongoRepository()
  return new DbLoadShips(shipMongoRepository)
}
