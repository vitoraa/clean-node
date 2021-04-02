import { ShipModel } from '@/domain/models/ship'

export interface AddShip {
  add: (ship: AddShipParams) => Promise<ShipModel>
}

export type AddShipParams = Omit<ShipModel, 'id'>
