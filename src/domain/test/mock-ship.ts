import { ShipModel } from '../models/ship'
import { AddShipParams } from '../usecases/ship/add-ship'
import { LoadShipsParams } from '../usecases/ship/load-ships'

export const mockAddShipParams = (): AddShipParams => ({
  ab: 10,
  name: 'any_name',
  imo: 'any_imo'
})

export const mockShipModel = (): ShipModel => ({
  id: 'any_id',
  ab: 10,
  name: 'any_name',
  imo: 'any_imo'
})

export const mockLoadShipsParams = (): LoadShipsParams => ({
  ab: 10,
  name: 'any_name',
  imo: 'any_imo'
})
