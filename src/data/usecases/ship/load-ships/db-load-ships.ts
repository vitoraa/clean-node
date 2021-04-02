import { ShipModel } from '@/domain/models/ship'
import { LoadShips, LoadShipsParams } from '@/domain/usecases/ship/load-ships'
import { LoadShipsRepository } from '../../../protocols/db/ship/load-ships-repository'

export class DbLoadShips implements LoadShips {
  constructor (
    private readonly loadShipRepository: LoadShipsRepository
  ) { }

  async load (params: LoadShipsParams): Promise<ShipModel[]> {
    const ships = await this.loadShipRepository.load(params)
    return ships
  }
}
