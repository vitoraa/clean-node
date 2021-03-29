import { SaveActivityRepository } from '@/data/protocols/db/activity/save-activity-repository'
import { ActivityModel } from '@/domain/models/activity'
import { SaveActivity, SaveActivityModel } from '@/domain/usecases/activity/save-activity'

export class DbSaveActivity implements SaveActivity {
  constructor (
    private readonly saveActivityRepository: SaveActivityRepository
  ) { }

  async save (activityData: SaveActivityModel): Promise<ActivityModel> {
    const activity = await this.saveActivityRepository.save(activityData)
    return activity
  }
}
