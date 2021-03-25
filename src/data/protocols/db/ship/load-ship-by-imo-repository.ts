import { ShipModel } from '../../../../domain/models/ship'

export interface LoadShipByImoRepository {
  load: (imo: string) => Promise<ShipModel>
}
