import { ShipModel } from '../../../domain/models/ship'
import { AddShip, AddShipModel } from '../../../domain/usecases/add-ship'
import { AddAShipRepository } from '../../protocols/db/ship/add-ship-repository'
import { LoadShipByImoRepository } from '../../protocols/db/ship/load-ship-by-imo-repository'

export class DbAddShip implements AddShip {
  constructor (
    private readonly addAShipRepository: AddAShipRepository,
    private readonly loadShipByImoRepository: LoadShipByImoRepository
  ) { }

  async add (ship: AddShipModel): Promise<ShipModel> {
    await this.loadShipByImoRepository.load(ship.imo)
    const newShip = await this.addAShipRepository.add(ship)
    return newShip
  }
}
