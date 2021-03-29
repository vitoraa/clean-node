import { DbSaveActivity } from './db-save-activity'
import { SaveActivityRepository } from '@/data/protocols/db/activity/save-activity-repository'
import { ActivityModel } from '@/domain/models/activity'
import { SaveActivityModel } from '@/domain/usecases/activity/save-activity'

import MockDate from 'mockdate'

const makeFakeSaveActivityModel = (): SaveActivityModel => ({
  date: new Date(),
  accountId: 'account_id',
  shipId: 'ship_id'
})

const makeFakeActivityModel = (): ActivityModel => Object.assign(
  {}, makeFakeSaveActivityModel(), { id: 'any_id' }
)

const makeSaveActivityRepository = (): SaveActivityRepository => {
  class LoadShipByIdRepositoryStub implements SaveActivityRepository {
    async save (activity: ActivityModel): Promise<ActivityModel> {
      return makeFakeActivityModel()
    }
  }
  return new LoadShipByIdRepositoryStub()
}

type SutTypes = {
  sut: DbSaveActivity
  saveActivityRepositoryStub: SaveActivityRepository
}

const makeSut = (): SutTypes => {
  const saveActivityRepositoryStub = makeSaveActivityRepository()
  const sut = new DbSaveActivity(saveActivityRepositoryStub)
  return { sut, saveActivityRepositoryStub }
}

describe('DbSaveActivity UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveActivityRepository with correct values', async () => {
    const { sut, saveActivityRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveActivityRepositoryStub, 'save')
    await sut.save(makeFakeSaveActivityModel())
    expect(saveSpy).toHaveBeenCalledWith(makeFakeSaveActivityModel())
  })

  test('Should return an activity on success', async () => {
    const { sut } = makeSut()
    const activity = await sut.save(makeFakeSaveActivityModel())
    expect(activity).toEqual(makeFakeActivityModel())
  })

  test('Should throw if SaveActivityRepository throws', async () => {
    const { sut, saveActivityRepositoryStub } = makeSut()
    jest.spyOn(saveActivityRepositoryStub, 'save').mockImplementation(() => {
      throw new Error()
    })
    const response = sut.save(makeFakeSaveActivityModel())
    await expect(response).rejects.toThrow()
  })
})
