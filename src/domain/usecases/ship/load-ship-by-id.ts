import { ShipModel } from '@/domain/models/ship'

export interface LoadShipById {
  loadById: (id: string) => Promise<ShipModel>
}
