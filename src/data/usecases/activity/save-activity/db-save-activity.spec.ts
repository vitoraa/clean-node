import { DbSaveActivity } from './db-save-activity'
import { InsertActivityRepository, UpdateActivityRepository } from '@/data/protocols/db/activity/save-activity-repository'
import MockDate from 'mockdate'
import { mockUpdateActivityParams, mockActivityModel, mockAddActivityParams, throwError } from '@/domain/test'
import { mockInsertActivityRepository, mockUpdateActivityRepository } from '@/data/test'

type SutTypes = {
  sut: DbSaveActivity
  insertActivityRepositoryStub: InsertActivityRepository
  updateActivityRepositoryStub: UpdateActivityRepository
}

const makeSut = (): SutTypes => {
  const insertActivityRepositoryStub = mockInsertActivityRepository()
  const updateActivityRepositoryStub = mockUpdateActivityRepository()
  const sut = new DbSaveActivity(insertActivityRepositoryStub, updateActivityRepositoryStub)
  return { sut, insertActivityRepositoryStub, updateActivityRepositoryStub }
}

describe('DbSaveActivity UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  describe('Insert', () => {
    test('Should call InsertActivityRepository with correct values', async () => {
      const { sut, insertActivityRepositoryStub } = makeSut()
      const saveSpy = jest.spyOn(insertActivityRepositoryStub, 'insert')
      await sut.add(mockAddActivityParams())
      expect(saveSpy).toHaveBeenCalledWith(mockAddActivityParams())
    })

    test('Should return an activity on success', async () => {
      const { sut } = makeSut()
      const activity = await sut.add(mockAddActivityParams())
      expect(activity).toEqual(mockActivityModel())
    })

    test('Should throw if InsertActivityRepository throws', async () => {
      const { sut, insertActivityRepositoryStub } = makeSut()
      jest.spyOn(insertActivityRepositoryStub, 'insert').mockImplementation(throwError)
      const response = sut.add(mockAddActivityParams())
      await expect(response).rejects.toThrow()
    })
  })

  describe('Update', () => {
    test('Should call UpdateActivityRepository with correct values', async () => {
      const { sut, updateActivityRepositoryStub } = makeSut()
      const updateSpy = jest.spyOn(updateActivityRepositoryStub, 'update')
      await sut.update(mockUpdateActivityParams(), 'any_id')
      expect(updateSpy).toHaveBeenCalledWith(mockAddActivityParams(), 'any_id')
    })

    test('Should return an activity on success', async () => {
      const { sut } = makeSut()
      const activity = await sut.update(mockUpdateActivityParams(), 'any_id')
      expect(activity).toEqual(mockActivityModel())
    })

    test('Should throw if UpdateActivityRepository throws', async () => {
      const { sut, updateActivityRepositoryStub } = makeSut()
      jest.spyOn(updateActivityRepositoryStub, 'update').mockImplementation(throwError)
      const response = sut.update(mockUpdateActivityParams(), 'any_id')
      await expect(response).rejects.toThrow()
    })
  })
})
