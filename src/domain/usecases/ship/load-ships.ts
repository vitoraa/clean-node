import { ShipModel } from '@/domain/models/ship'

export interface LoadShips {
  load: (params: LoadShipsParams) => Promise<ShipModel[]>
}

export type LoadShipsParams = {
  name?: string
  imo?: string
  ab?: number
}
