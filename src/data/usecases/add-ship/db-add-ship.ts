import { ShipModel } from '../../../domain/models/ship'
import { AddShip, AddShipModel } from '../../../domain/usecases/add-ship'
import { AddAShipRepository } from '../../protocols/db/ship/add-ship-repository'

export class DbAddShip implements AddShip {
  constructor (private readonly addAShipRepository: AddAShipRepository) { }
  async add (ship: AddShipModel): Promise<ShipModel> {
    await this.addAShipRepository.add(ship)
    return null
  }
}
