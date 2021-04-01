import { DbSaveActivity } from './db-save-activity'
import { InsertActivityRepository } from '@/data/protocols/db/activity/save-activity-repository'
import { ActivityModel } from '@/domain/models/activity'
import { CreateActivityModel } from '@/domain/usecases/activity/insert-activity'

import MockDate from 'mockdate'

const makeFakeCreateActivityModel = (): CreateActivityModel => ({
  date: new Date(),
  accountId: 'account_id',
  shipId: 'ship_id'
})

const makeFakeActivityModel = (): ActivityModel => Object.assign(
  {}, makeFakeCreateActivityModel(), { id: 'any_id' }
)

const makeInsertActivityRepository = (): InsertActivityRepository => {
  class InsertActivityRepositoryStub implements InsertActivityRepository {
    async insert (activity: ActivityModel): Promise<ActivityModel> {
      return makeFakeActivityModel()
    }
  }
  return new InsertActivityRepositoryStub()
}

type SutTypes = {
  sut: DbSaveActivity
  InsertActivityRepositoryStub: InsertActivityRepository
}

const makeSut = (): SutTypes => {
  const InsertActivityRepositoryStub = makeInsertActivityRepository()
  const sut = new DbSaveActivity(InsertActivityRepositoryStub)
  return { sut, InsertActivityRepositoryStub }
}

describe('DbSaveActivity UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call InsertActivityRepository with correct values', async () => {
    const { sut, InsertActivityRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(InsertActivityRepositoryStub, 'insert')
    await sut.insert(makeFakeCreateActivityModel())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeCreateActivityModel())
  })

  test('Should return an activity on success', async () => {
    const { sut } = makeSut()
    const activity = await sut.insert(makeFakeCreateActivityModel())
    expect(activity).toEqual(makeFakeActivityModel())
  })

  test('Should throw if InsertActivityRepository throws', async () => {
    const { sut, InsertActivityRepositoryStub } = makeSut()
    jest.spyOn(InsertActivityRepositoryStub, 'insert').mockImplementation(() => {
      throw new Error()
    })
    const response = sut.insert(makeFakeCreateActivityModel())
    await expect(response).rejects.toThrow()
  })
})
