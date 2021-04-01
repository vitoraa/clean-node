import { ShipModel } from '@/domain/models/ship'
import { LoadShipById } from '@/domain/usecases/ship/load-ship-by-id'
import { LoadShipByIdRepository } from '@/data/protocols/db/ship/load-ship-by-id-repository'

export class DbLoadShipById implements LoadShipById {
  constructor (
    private readonly loadShipByIdRepository: LoadShipByIdRepository
  ) { }

  async loadById (id: string): Promise<ShipModel> {
    const ship = await this.loadShipByIdRepository.loadById(id)
    return ship
  }
}
