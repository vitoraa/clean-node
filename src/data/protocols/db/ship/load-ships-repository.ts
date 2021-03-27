import { ShipModel } from '../../../../domain/models/ship'

export interface LoadShipsRepository {
  load: (params: any) => Promise<ShipModel[]>
}
