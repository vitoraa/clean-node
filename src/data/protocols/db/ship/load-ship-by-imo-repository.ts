import { ShipModel } from '@/domain/models/ship'

export interface LoadShipByImoRepository {
  loadByImo: (imo: string) => Promise<ShipModel>
}
