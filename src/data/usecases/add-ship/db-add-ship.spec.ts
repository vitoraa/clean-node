import { ShipModel } from '@/domain/models/ship'
import { AddShipModel } from '@/domain/usecases/ship/add-ship'
import { DbAddShip } from './db-add-ship'
import { AddShipRepository } from '@/data/protocols/db/ship/add-ship-repository'
import { LoadShipByImoRepository } from '@/data/protocols/db/ship/load-ship-by-imo-repository'

const makeFakeShipData = (): AddShipModel => ({
  ab: 10,
  name: 'any_name',
  imo: 'any_imo'
})

const makeFakeShipModel = (): ShipModel => ({
  id: 'any_id',
  ab: 10,
  name: 'any_name',
  imo: 'any_imo'
})

const makeAddShipRepository = (): AddShipRepository => {
  class AddShipRepositoryStub implements AddShipRepository {
    async add (ship: AddShipModel): Promise<ShipModel> {
      return makeFakeShipModel()
    }
  }
  return new AddShipRepositoryStub()
}

const makeLoadShipByImoRepository = (): LoadShipByImoRepository => {
  class LoadShipByImoRepositoryStub implements LoadShipByImoRepository {
    async loadByImo (imo: string): Promise<ShipModel> {
      return null
    }
  }
  return new LoadShipByImoRepositoryStub()
}

interface SutTypes {
  sut: DbAddShip
  addShipRepositoryStub: AddShipRepository
  loadShipByImoRepositoryStub: LoadShipByImoRepository
}

const makeSut = (): SutTypes => {
  const loadShipByImoRepositoryStub = makeLoadShipByImoRepository()
  const addShipRepositoryStub = makeAddShipRepository()
  const sut = new DbAddShip(addShipRepositoryStub, loadShipByImoRepositoryStub)
  return { sut, addShipRepositoryStub, loadShipByImoRepositoryStub }
}

describe('DbAddShip UseCase', () => {
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
    const ship = await sut.add(makeFakeShipData())
    expect(ship).toEqual(makeFakeShipModel())
  })

  test('Should call LoadShipByImoRepository with correct values', async () => {
    const { sut, loadShipByImoRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadShipByImoRepositoryStub, 'loadByImo')
    const fakeShipData = makeFakeShipData()
    await sut.add(fakeShipData)
    expect(loadSpy).toHaveBeenCalledWith(fakeShipData.imo)
  })

  test('Should throw if LoadShipByImoRepository throws', async () => {
    const { sut, loadShipByImoRepositoryStub } = makeSut()
    jest.spyOn(loadShipByImoRepositoryStub, 'loadByImo').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.add(makeFakeShipData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadShipByImoRepository find a ship', async () => {
    const { sut, loadShipByImoRepositoryStub } = makeSut()
    jest.spyOn(loadShipByImoRepositoryStub, 'loadByImo').mockReturnValueOnce(new Promise(resolve => resolve((makeFakeShipModel()))))
    const response = await sut.add(makeFakeShipData())
    expect(response).toBeNull()
  })
})
