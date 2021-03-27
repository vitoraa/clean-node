import { ShipModel } from '../../../../domain/models/ship'
import { AddShipModel } from '../../../../domain/usecases/ship/add-ship'

export interface AddShipRepository {
  add: (ship: AddShipModel) => Promise<ShipModel>
}
