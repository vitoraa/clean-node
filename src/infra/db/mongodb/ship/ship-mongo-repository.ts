import { AddShipRepository } from '@/data/protocols/db/ship/add-ship-repository'
import { LoadShipByImoRepository } from '@/data/protocols/db/ship/load-ship-by-imo-repository'
import { ShipModel } from '@/domain/models/ship'
import { AddShipParams } from '@/domain/usecases/ship/add-ship'
import { LoadShipById } from '@/domain/usecases/ship/load-ship-by-id'
import { LoadShips, LoadShipsParams } from '@/domain/usecases/ship/load-ships'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class ShipMongoRepository implements AddShipRepository, LoadShipByImoRepository, LoadShips, LoadShipById {
  async loadById (id: string): Promise<ShipModel> {
    const shipCollection = await MongoHelper.getCollection('ships')
    if (ObjectId.isValid(id)) {
      const shipFound = await shipCollection.findOne({ _id: new ObjectId(id) })
      return shipFound && MongoHelper.map(shipFound)
    }
    return null
  }

  async loadByImo (imo: string): Promise<ShipModel> {
    const shipCollection = await MongoHelper.getCollection('ships')
    const shipFound = await shipCollection.findOne({ imo })
    return shipFound && MongoHelper.map(shipFound)
  }

  async add (ship: AddShipParams): Promise<ShipModel> {
    const shipCollection = await MongoHelper.getCollection('ships')
    const result = await shipCollection.insertOne(ship)
    const newShip = result.ops[0]
    return MongoHelper.map(newShip)
  }

  async load (params: LoadShipsParams): Promise<ShipModel[]> {
    const shipCollection = await MongoHelper.getCollection('ships')
    const ships: ShipModel[] = await shipCollection.find().toArray()
    return ships
  }
}
