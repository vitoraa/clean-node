import { MongoHelper } from '../helpers/mongo-helper'
import { ShipMongoRepository } from './ship-mongo-repository'

interface SutTypes {
  sut: ShipMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new ShipMongoRepository()
  return { sut }
}

describe('Ship Mongo Repository', () => {
  let shipCollection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    shipCollection = await MongoHelper.getCollection('ships')
    await shipCollection.deleteMany({})
  })

  test('Should return a ship on add success', async () => {
    const { sut } = makeSut()
    const ship = await sut.add({
      name: 'any_name',
      ab: 10,
      imo: 'any_imo'
    })
    expect(ship).toBeTruthy()
    expect(ship.id).toBeTruthy()
    expect(ship.name).toBe('any_name')
    expect(ship.ab).toBe(10)
    expect(ship.imo).toBe('any_imo')
  })

  test('Should return a ship on loadByImo success', async () => {
    const { sut } = makeSut()
    await shipCollection.insertOne({
      name: 'any_name',
      ab: 10,
      imo: 'any_imo'
    })
    const ship = await sut.loadByImo('any_imo')
    expect(ship).toBeTruthy()
    expect(ship.id).toBeTruthy()
    expect(ship.name).toBe('any_name')
    expect(ship.ab).toBe(10)
    expect(ship.imo).toBe('any_imo')
  })

  test('Should return null if loadByImo fails', async () => {
    const { sut } = makeSut()
    const ship = await sut.loadByImo('any_imo')
    expect(ship).toBeFalsy()
  })
})