import { ShipModel } from '@/domain/models/ship'
import { LoadShipsModel } from '@/domain/usecases/ship/load-ships'
import { LoadShipsRepository } from '@/data/protocols/db/ship/load-ships-repository'
import { DbLoadShips } from './db-load-ships'

const makeFakeLoadShipsData = (): LoadShipsModel => ({
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

const makeLoadShipsRepository = (): LoadShipsRepository => {
  class LoadShipsRepositoryStub implements LoadShipsRepository {
    async load (params: LoadShipsModel): Promise<ShipModel[]> {
      return [makeFakeShipModel(), makeFakeShipModel()]
    }
  }
  return new LoadShipsRepositoryStub()
}

type SutTypes = {
  sut: DbLoadShips
  loadShipsRepositoryStub: LoadShipsRepository
}

const makeSut = (): SutTypes => {
  const loadShipsRepositoryStub = makeLoadShipsRepository()
  const sut = new DbLoadShips(loadShipsRepositoryStub)
  return { sut, loadShipsRepositoryStub }
}

describe('DbLoadShips UseCase', () => {
  test('Should call LoadShipsRepository with correct values', async () => {
    const { sut, loadShipsRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadShipsRepositoryStub, 'load')
    await sut.load(makeFakeLoadShipsData())
    expect(loadSpy).toHaveBeenCalledWith(makeFakeLoadShipsData())
  })

  test('Should throw if LoadShipsRepository throws', async () => {
    const { sut, loadShipsRepositoryStub } = makeSut()
    jest.spyOn(loadShipsRepositoryStub, 'load').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.load(makeFakeLoadShipsData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return Ships on success', async () => {
    const { sut } = makeSut()
    const ship = await sut.load(makeFakeLoadShipsData())
    expect(ship).toEqual([makeFakeShipModel(), makeFakeShipModel()])
  })
})
