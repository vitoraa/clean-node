import { ShipModel } from '@/domain/models/ship'

export interface LoadShipByIdRepository {
  loadById: (id: string) => Promise<ShipModel>
}
