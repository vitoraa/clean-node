import { AddAShipRepository } from '../../../../data/protocols/db/ship/add-ship-repository'
import { LoadShipByImoRepository } from '../../../../data/protocols/db/ship/load-ship-by-imo-repository'
import { ShipModel } from '../../../../domain/models/ship'
import { AddShipModel } from '../../../../domain/usecases/add-ship'
import { MongoHelper } from '../helpers/mongo-helper'

export class ShipMongoRepository implements AddAShipRepository, LoadShipByImoRepository {
  async loadByImo (imo: string): Promise<ShipModel> {
    const shipCollection = await MongoHelper.getCollection('ships')
    const shipFound = await shipCollection.findOne({ imo })
    return shipFound && MongoHelper.map(shipFound)
  }

  async add (ship: AddShipModel): Promise<ShipModel> {
    const shipCollection = await MongoHelper.getCollection('ships')
    const result = await shipCollection.insertOne(ship)
    const newShip = result.ops[0]
    return MongoHelper.map(newShip)
  }
}
