import { ShipModel } from '../../../../domain/models/ship'
import { AddShipParams } from '../../../../domain/usecases/ship/add-ship'

export interface AddShipRepository {
  add: (ship: AddShipParams) => Promise<ShipModel>
}
