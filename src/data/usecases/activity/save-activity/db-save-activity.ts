import { InsertActivityRepository, UpdateActivityRepository } from '@/data/protocols/db/activity/save-activity-repository'
import { AddActivity } from '@/domain/usecases/activity/add-activity'
import { UpdateActivity } from '@/domain/usecases/activity/update-activity'

export class DbSaveActivity implements AddActivity, UpdateActivity {
  constructor (
    private readonly saveActivityRepository: InsertActivityRepository,
    private readonly updateActivityRepository: UpdateActivityRepository
  ) { }

  async add (activityData: AddActivity.Params): Promise<AddActivity.Result> {
    const activity = await this.saveActivityRepository.insert(activityData)
    return activity
  }

  async update (data: UpdateActivity.Params, id: string): Promise<UpdateActivity.Result> {
    const activity = await this.updateActivityRepository.update(data, id)
    return activity
  }
}
