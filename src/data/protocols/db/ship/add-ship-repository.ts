import { ShipModel } from '../../../../domain/models/ship'
import { AddShipModel } from '../../../../domain/usecases/add-ship'

export interface AddShipRepository {
  add: (ship: AddShipModel) => Promise<ShipModel>
}
