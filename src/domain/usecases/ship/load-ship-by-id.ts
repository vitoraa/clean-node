import { ShipModel } from '@/domain/models/ship'

export interface LoadShips {
  loadById: (id: string) => Promise<ShipModel>
}
