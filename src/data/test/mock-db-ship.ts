import { AddShipRepository } from '@/data/protocols/db/ship/add-ship-repository'
import { LoadShipByIdRepository } from '@/data/protocols/db/ship/load-ship-by-id-repository'
import { LoadShipByImoRepository } from '@/data/protocols/db/ship/load-ship-by-imo-repository'
import { ShipModel } from '@/domain/models/ship'
import { mockShipModel } from '@/domain/test'
import { AddShipParams } from '@/domain/usecases/ship/add-ship'

export const mockAddShipRepository = (): AddShipRepository => {
  class AddShipRepositoryStub implements AddShipRepository {
    async add (ship: AddShipParams): Promise<ShipModel> {
      return mockShipModel()
    }
  }
  return new AddShipRepositoryStub()
}

export const mockLoadShipByImoRepository = (): LoadShipByImoRepository => {
  class LoadShipByImoRepositoryStub implements LoadShipByImoRepository {
    async loadByImo (imo: string): Promise<ShipModel> {
      return null
    }
  }
  return new LoadShipByImoRepositoryStub()
}

export const mockLoadShipByIdRepository = (): LoadShipByIdRepository => {
  class LoadShipByIdRepositoryStub implements LoadShipByIdRepository {
    async loadById (id: string): Promise<ShipModel> {
      return mockShipModel()
    }
  }
  return new LoadShipByIdRepositoryStub()
}
