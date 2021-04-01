import { ActivityModel } from '@/domain/models/activity'
import { CreateActivityModel, InsertActivity } from '@/domain/usecases/activity/insert-activity'

export class DbSaveActivity implements InsertActivity {
  constructor (
    private readonly saveActivityRepository: InsertActivity
  ) { }

  async insert (activityData: CreateActivityModel): Promise<ActivityModel> {
    const activity = await this.saveActivityRepository.insert(activityData)
    return activity
  }
}
