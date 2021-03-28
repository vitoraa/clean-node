import { ShipModel } from '@/domain/models/ship'

export interface AddShip {
  add: (ship: AddShipModel) => Promise<ShipModel>
}

export type AddShipModel = Omit<ShipModel, 'id'>
