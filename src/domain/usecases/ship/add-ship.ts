import { ShipModel } from '@/domain/models/ship'

export interface AddShip {
  add: (ship: AddShipModel) => Promise<ShipModel>
}

export interface AddShipModel {
  name: string
  ab: number
  imo: string
}
