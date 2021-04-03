import { DbAddShip } from './db-add-ship'
import { AddShipRepository } from '@/data/protocols/db/ship/add-ship-repository'
import { LoadShipByImoRepository } from '@/data/protocols/db/ship/load-ship-by-imo-repository'
import { mockAddShipParams, mockShipModel, throwError } from '@/domain/test'
import { mockLoadShipByImoRepository, mockAddShipRepository } from '@/data/test'

type SutTypes = {
  sut: DbAddShip
  addShipRepositoryStub: AddShipRepository
  loadShipByImoRepositoryStub: LoadShipByImoRepository
}

const makeSut = (): SutTypes => {
  const loadShipByImoRepositoryStub = mockLoadShipByImoRepository()
  const addShipRepositoryStub = mockAddShipRepository()
  const sut = new DbAddShip(addShipRepositoryStub, loadShipByImoRepositoryStub)
  return { sut, addShipRepositoryStub, loadShipByImoRepositoryStub }
}

describe('DbAddShip UseCase', () => {
  test('Should call AddShipRepository with correct values', async () => {
    const { sut, addShipRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addShipRepositoryStub, 'add')
    const fakeShipData = mockAddShipParams()
    await sut.add(fakeShipData)
    expect(addSpy).toHaveBeenCalledWith(fakeShipData)
  })

  test('Should throw if AddShipRepository throws', async () => {
    const { sut, addShipRepositoryStub } = makeSut()
    jest.spyOn(addShipRepositoryStub, 'add').mockImplementation(throwError)
    const promise = sut.add(mockAddShipParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a Ship on success', async () => {
    const { sut } = makeSut()
    const ship = await sut.add(mockAddShipParams())
    expect(ship).toEqual(mockShipModel())
  })

  test('Should call LoadShipByImoRepository with correct values', async () => {
    const { sut, loadShipByImoRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadShipByImoRepositoryStub, 'loadByImo')
    const fakeShipData = mockAddShipParams()
    await sut.add(fakeShipData)
    expect(loadSpy).toHaveBeenCalledWith(fakeShipData.imo)
  })

  test('Should throw if LoadShipByImoRepository throws', async () => {
    const { sut, loadShipByImoRepositoryStub } = makeSut()
    jest.spyOn(loadShipByImoRepositoryStub, 'loadByImo').mockImplementation(throwError)
    const promise = sut.add(mockAddShipParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadShipByImoRepository find a ship', async () => {
    const { sut, loadShipByImoRepositoryStub } = makeSut()
    jest.spyOn(loadShipByImoRepositoryStub, 'loadByImo').mockReturnValueOnce(new Promise(resolve => resolve((mockShipModel()))))
    const response = await sut.add(mockAddShipParams())
    expect(response).toBeNull()
  })
})
