import { ShipModel } from '../../../domain/models/ship'
import { AddShipModel } from '../../../domain/usecases/add-ship'
import { DbAddShip } from './db-add-ship'
import { AddAShipRepository } from '../../protocols/db/ship/add-ship-repository'
import { LoadShipByImoRepository } from '../../protocols/db/ship/load-ship-by-imo-repository'

const makeFakeShipData = (): AddShipModel => ({
  ab: 10,
  name: 'any_name',
  imo: 'any_imo'
})

const makeFakeShipModel = (): ShipModel => ({
  ab: 10,
  name: 'any_name',
  imo: 'any_imo'
})

const makeAddShipRepository = (): AddAShipRepository => {
  class AddShipRepositoryStub implements AddAShipRepository {
    async add (ship: AddShipModel): Promise<ShipModel> {
      return makeFakeShipModel()
    }
  }
  return new AddShipRepositoryStub()
}

const makeLoadShipByImoRepository = (): LoadShipByImoRepository => {
  class LoadShipByImoRepositoryStub implements LoadShipByImoRepository {
    async load (imo: string): Promise<ShipModel> {
      return null
    }
  }
  return new LoadShipByImoRepositoryStub()
}

interface SutTypes {
  sut: DbAddShip
  addShipRepositoryStub: AddAShipRepository
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
    const account = await sut.add(makeFakeShipData())
    expect(account).toEqual(makeFakeShipModel())
  })

  test('Should call LoadShipByRepository with correct values', async () => {
    const { sut, loadShipByImoRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadShipByImoRepositoryStub, 'load')
    const fakeShipData = makeFakeShipData()
    await sut.add(fakeShipData)
    expect(loadSpy).toHaveBeenCalledWith(fakeShipData.imo)
  })

  test('Should throw if LoadShipByRepository throws', async () => {
    const { sut, loadShipByImoRepositoryStub } = makeSut()
    jest.spyOn(loadShipByImoRepositoryStub, 'load').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.add(makeFakeShipData())
    await expect(promise).rejects.toThrow()
  })
})
