import { ShipModel } from '../models/ship'

export interface AddShip {
  add: (ship: AddShipModel) => Promise<ShipModel>
}

export interface AddShipModel {
  name: string
  ab: number
  imo: string
}
