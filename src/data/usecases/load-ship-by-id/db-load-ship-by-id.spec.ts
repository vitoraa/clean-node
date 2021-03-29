import { ShipModel } from '@/domain/models/ship'
import { LoadShipByIdRepository } from '@/data/protocols/db/ship/load-ship-by-id-repository'
import { DbLoadShipById } from './db-load-ship-by-id'

const makeFakeShipModel = (): ShipModel => ({
  id: 'any_id',
  ab: 10,
  name: 'any_name',
  imo: 'any_imo'
})

const makeLoadShipByIdRepository = (): LoadShipByIdRepository => {
  class LoadShipByIdRepositoryStub implements LoadShipByIdRepository {
    async loadById (id: string): Promise<ShipModel> {
      return makeFakeShipModel()
    }
  }
  return new LoadShipByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadShipById
  loadShipByIdRepositoryStub: LoadShipByIdRepository
}

const makeSut = (): SutTypes => {
  const loadShipByIdRepositoryStub = makeLoadShipByIdRepository()
  const sut = new DbLoadShipById(loadShipByIdRepositoryStub)
  return { sut, loadShipByIdRepositoryStub }
}

describe('DbLoadShips UseCase', () => {
  test('Should call LoadShipsByIdRepository with correct values', async () => {
    const { sut, loadShipByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadShipByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })
})
