import { AddAShipRepository } from '../../../../data/protocols/db/ship/add-ship-repository'
import { ShipModel } from '../../../../domain/models/ship'
import { AddShipModel } from '../../../../domain/usecases/add-ship'
import { MongoHelper } from '../helpers/mongo-helper'

export class ShipMongoRepository implements AddAShipRepository {
  async add (ship: AddShipModel): Promise<ShipModel> {
    const shipCollection = await MongoHelper.getCollection('accounts')
    const result = await shipCollection.insertOne(ship)
    const account = result.ops[0]
    return MongoHelper.map(account)
  }
}
