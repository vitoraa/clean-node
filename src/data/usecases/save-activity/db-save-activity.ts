import { ActivityModel } from '@/domain/models/activity'
import { CreateActivityModel, InsertActivity } from '@/domain/usecases/activity/insert-activity'
import { UpdateActivity, UpdateActivityModel } from '@/domain/usecases/activity/update-activity'

export class DbSaveActivity implements InsertActivity, UpdateActivity {
  constructor (
    private readonly saveActivityRepository: InsertActivity,
    private readonly updateActivityRepository: UpdateActivity
  ) { }

  async insert (activityData: CreateActivityModel): Promise<ActivityModel> {
    const activity = await this.saveActivityRepository.insert(activityData)
    return activity
  }

  async update (data: UpdateActivityModel, id: string): Promise<ActivityModel> {
    await this.updateActivityRepository.update(data, id)
    return null
  }
}
