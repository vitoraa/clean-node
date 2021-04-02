import { InsertActivityRepository, UpdateActivityRepository } from '@/data/protocols/db/activity/save-activity-repository'
import { ActivityModel } from '@/domain/models/activity'
import { AddActivityParams, AddActivity } from '@/domain/usecases/activity/add-activity'
import { UpdateActivity, UpdateActivityParams } from '@/domain/usecases/activity/update-activity'

export class DbSaveActivity implements AddActivity, UpdateActivity {
  constructor (
    private readonly saveActivityRepository: InsertActivityRepository,
    private readonly updateActivityRepository: UpdateActivityRepository
  ) { }

  async add (activityData: AddActivityParams): Promise<ActivityModel> {
    const activity = await this.saveActivityRepository.insert(activityData)
    return activity
  }

  async update (data: UpdateActivityParams, id: string): Promise<ActivityModel> {
    const activity = await this.updateActivityRepository.update(data, id)
    return activity
  }
}
