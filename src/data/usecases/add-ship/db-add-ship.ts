import { ShipModel } from '@/domain/models/ship'
import { AddShip, AddShipModel } from '@/domain/usecases/ship/add-ship'
import { AddShipRepository } from '@/data/protocols/db/ship/add-ship-repository'
import { LoadShipByImoRepository } from '@/data/protocols/db/ship/load-ship-by-imo-repository'

export class DbAddShip implements AddShip {
  constructor (
    private readonly addShipRepository: AddShipRepository,
    private readonly loadShipByImoRepository: LoadShipByImoRepository
  ) { }

  async add (ship: AddShipModel): Promise<ShipModel> {
    const shipWithSameImo = await this.loadShipByImoRepository.loadByImo(ship.imo)
    if (!shipWithSameImo) {
      const newShip = await this.addShipRepository.add(ship)
      return newShip
    }
    return null
  }
}
