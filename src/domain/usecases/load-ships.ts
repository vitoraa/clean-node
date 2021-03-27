import { ShipModel } from '../models/ship'

export interface LoadShips {
  load: (params: LoadShipsModel) => Promise<ShipModel[]>
}

export interface LoadShipsModel {
  email: string
  name: string
  password: string
}
