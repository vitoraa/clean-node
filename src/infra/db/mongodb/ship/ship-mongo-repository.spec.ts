import { MongoHelper } from '../helpers/mongo-helper'
import { ShipMongoRepository } from './ship-mongo-repository'

const makeFakeShip = (): any => ({
  name: 'any_name',
  ab: 10,
  imo: 'any_imo'
})

type SutTypes = {
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
    const ship = await sut.add(makeFakeShip())
    expect(ship).toBeTruthy()
    expect(ship.id).toBeTruthy()
    expect(ship.name).toBe('any_name')
    expect(ship.ab).toBe(10)
    expect(ship.imo).toBe('any_imo')
  })

  test('Should return a ship on loadByImo success', async () => {
    const { sut } = makeSut()
    await shipCollection.insertOne(makeFakeShip())
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

  test('Should return all ships on load if object empty', async () => {
    const { sut } = makeSut()
    await shipCollection.insertOne(makeFakeShip())
    await shipCollection.insertOne(makeFakeShip())
    const ships = await sut.load({})
    expect(ships).toBeTruthy()
    expect(ships.length).toBe(2)
  })

  test('Should load empty list', async () => {
    const { sut } = makeSut()
    const ships = await sut.load({})
    expect(ships).toBeTruthy()
    expect(ships).toEqual([])
  })

  test('Should return a ship on loadById success', async () => {
    const { sut } = makeSut()
    const newShip = await shipCollection.insertOne(makeFakeShip())
    const ship = await sut.loadById(newShip.ops[0]._id)
    expect(ship).toBeTruthy()
    expect(ship.id).toBeTruthy()
    expect(ship.name).toBe('any_name')
    expect(ship.ab).toBe(10)
    expect(ship.imo).toBe('any_imo')
  })
})
