import { ShipModel } from '../../../../domain/models/ship'
import { AddShipModel } from '../../../../domain/usecases/add-ship'

export interface AddAShipRepository {
  add: (ship: AddShipModel) => Promise<ShipModel>
}
