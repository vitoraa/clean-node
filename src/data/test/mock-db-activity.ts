import { ActivityModel } from '@/domain/models/activity'
import { mockActivityModel } from '@/domain/test'
import { InsertActivityRepository, UpdateActivityRepository } from '../protocols/db/activity/save-activity-repository'

export const mockInsertActivityRepository = (): InsertActivityRepository => {
  class InsertActivityRepositoryStub implements InsertActivityRepository {
    async insert (activity: ActivityModel): Promise<ActivityModel> {
      return mockActivityModel()
    }
  }
  return new InsertActivityRepositoryStub()
}

export const mockUpdateActivityRepository = (): UpdateActivityRepository => {
  class UpdateActivityRepositoryStub implements UpdateActivityRepository {
    async update (activity: ActivityModel, id: string): Promise<ActivityModel> {
      return mockActivityModel()
    }
  }
  return new UpdateActivityRepositoryStub()
}
