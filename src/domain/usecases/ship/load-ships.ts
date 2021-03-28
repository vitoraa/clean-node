import { ShipModel } from '@/domain/models/ship'

export interface LoadShips {
  load: (params: LoadShipsModel) => Promise<ShipModel[]>
}

export type LoadShipsModel = {
  name?: string
  imo?: string
  ab?: number
}
