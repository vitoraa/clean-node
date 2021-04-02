import { DbSaveActivity } from './db-save-activity'
import { InsertActivityRepository, UpdateActivityRepository } from '@/data/protocols/db/activity/save-activity-repository'
import { ActivityModel } from '@/domain/models/activity'
import { AddActivityParams } from '@/domain/usecases/activity/add-activity'

import MockDate from 'mockdate'
import { UpdateActivityParams } from '@/domain/usecases/activity/update-activity'

const makeFakeCreateActivityModel = (): AddActivityParams => ({
  accountId: 'account_id',
  shipId: 'ship_id'
})

const makeFakeUpdateActivityParams = (): UpdateActivityParams => ({
  accountId: 'account_id',
  shipId: 'ship_id'
})

const makeFakeActivityModel = (): ActivityModel => Object.assign(
  {}, makeFakeCreateActivityModel(), { id: 'any_id', date: new Date() }
)

const makeInsertActivityRepository = (): InsertActivityRepository => {
  class InsertActivityRepositoryStub implements InsertActivityRepository {
    async insert (activity: ActivityModel): Promise<ActivityModel> {
      return makeFakeActivityModel()
    }
  }
  return new InsertActivityRepositoryStub()
}

const makeUpdateActivityRepository = (): UpdateActivityRepository => {
  class UpdateActivityRepositoryStub implements UpdateActivityRepository {
    async update (activity: ActivityModel, id: string): Promise<ActivityModel> {
      return makeFakeActivityModel()
    }
  }
  return new UpdateActivityRepositoryStub()
}

type SutTypes = {
  sut: DbSaveActivity
  insertActivityRepositoryStub: InsertActivityRepository
  updateActivityRepositoryStub: UpdateActivityRepository
}

const makeSut = (): SutTypes => {
  const insertActivityRepositoryStub = makeInsertActivityRepository()
  const updateActivityRepositoryStub = makeUpdateActivityRepository()
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
      await sut.add(makeFakeCreateActivityModel())
      expect(saveSpy).toHaveBeenCalledWith(makeFakeCreateActivityModel())
    })

    test('Should return an activity on success', async () => {
      const { sut } = makeSut()
      const activity = await sut.add(makeFakeCreateActivityModel())
      expect(activity).toEqual(makeFakeActivityModel())
    })

    test('Should throw if InsertActivityRepository throws', async () => {
      const { sut, insertActivityRepositoryStub } = makeSut()
      jest.spyOn(insertActivityRepositoryStub, 'insert').mockImplementation(() => {
        throw new Error()
      })
      const response = sut.add(makeFakeCreateActivityModel())
      await expect(response).rejects.toThrow()
    })
  })

  describe('Update', () => {
    test('Should call UpdateActivityRepository with correct values', async () => {
      const { sut, updateActivityRepositoryStub } = makeSut()
      const updateSpy = jest.spyOn(updateActivityRepositoryStub, 'update')
      await sut.update(makeFakeUpdateActivityParams(), 'any_id')
      expect(updateSpy).toHaveBeenCalledWith(makeFakeCreateActivityModel(), 'any_id')
    })

    test('Should return an activity on success', async () => {
      const { sut } = makeSut()
      const activity = await sut.update(makeFakeUpdateActivityParams(), 'any_id')
      expect(activity).toEqual(makeFakeActivityModel())
    })

    test('Should throw if UpdateActivityRepository throws', async () => {
      const { sut, updateActivityRepositoryStub } = makeSut()
      jest.spyOn(updateActivityRepositoryStub, 'update').mockImplementation(() => {
        throw new Error()
      })
      const response = sut.update(makeFakeUpdateActivityParams(), 'any_id')
      await expect(response).rejects.toThrow()
    })
  })
})
