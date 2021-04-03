import { ShipModel } from '@/domain/models/ship'
import { LoadShipsParams } from '@/domain/usecases/ship/load-ships'
import { LoadShipsRepository } from '@/data/protocols/db/ship/load-ships-repository'
import { DbLoadShips } from './db-load-ships'
import { mockLoadShipsParams, mockShipModel, throwError } from '@/domain/test'

const makeLoadShipsRepository = (): LoadShipsRepository => {
  class LoadShipsRepositoryStub implements LoadShipsRepository {
    async load (params: LoadShipsParams): Promise<ShipModel[]> {
      return [mockShipModel(), mockShipModel()]
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
    await sut.load(mockLoadShipsParams())
    expect(loadSpy).toHaveBeenCalledWith(mockLoadShipsParams())
  })

  test('Should throw if LoadShipsRepository throws', async () => {
    const { sut, loadShipsRepositoryStub } = makeSut()
    jest.spyOn(loadShipsRepositoryStub, 'load').mockImplementation(throwError)
    const promise = sut.load(mockLoadShipsParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return Ships on success', async () => {
    const { sut } = makeSut()
    const ship = await sut.load(mockLoadShipsParams())
    expect(ship).toEqual([mockShipModel(), mockShipModel()])
  })
})
