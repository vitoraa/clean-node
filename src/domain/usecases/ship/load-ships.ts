import { ShipModel } from '../../models/ship'

export interface LoadShips {
  load: (params: LoadShipsModel) => Promise<ShipModel[]>
}

export interface LoadShipsModel {
  name: string
  imo: string
  ab: number
}
