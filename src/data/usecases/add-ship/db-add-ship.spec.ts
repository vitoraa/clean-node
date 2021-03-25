import { ShipModel } from '../../../domain/models/ship'
import { AddShipModel } from '../../../domain/usecases/add-ship'
import { DbAddShip } from './db-add-ship'
import { AddAShipRepository } from '../../protocols/db/ship/add-ship-repository'

const makeFakeShipData = (): AddShipModel => ({
  ab: 10,
  name: 'any_name'
})

const makeFakeShipModel = (): ShipModel => ({
  ab: 10,
  name: 'any_name'
})

const makeAddShipRepository = (): AddAShipRepository => {
  class AddShipRepositoryStub implements AddAShipRepository {
    async add (ship: AddShipModel): Promise<ShipModel> {
      return makeFakeShipModel()
    }
  }
  return new AddShipRepositoryStub()
}

interface SutTypes {
  sut: DbAddShip
  addShipRepositoryStub: AddAShipRepository
}

const makeSut = (): SutTypes => {
  const addShipRepositoryStub = makeAddShipRepository()
  const sut = new DbAddShip(addShipRepositoryStub)
  return { sut, addShipRepositoryStub }
}

describe('DbAddShip', () => {
  test('Should call AddShipRepository with correct values', async () => {
    const { sut, addShipRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addShipRepositoryStub, 'add')
    const fakeShipData = makeFakeShipData()
    await sut.add(fakeShipData)
    expect(addSpy).toHaveBeenCalledWith(fakeShipData)
  })

  test('Should throw if AddShipRepository throws', async () => {
    const { sut, addShipRepositoryStub } = makeSut()
    jest.spyOn(addShipRepositoryStub, 'add').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.add(makeFakeShipData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a Ship on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeShipData())
    expect(account).toEqual(makeFakeShipModel())
  })
})
