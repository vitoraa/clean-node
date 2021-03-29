import { SaveActivityRepository } from '@/data/protocols/db/activity/save-activity-repository'
import { ActivityModel } from '@/domain/models/activity'
import { SaveActivity, SaveActivityModel } from '@/domain/usecases/activity/save-activity'

export class DbSaveActivity implements SaveActivity {
  constructor (
    private readonly saveActivityRepository: SaveActivityRepository
  ) { }

  async save (data: SaveActivityModel): Promise<ActivityModel> {
    await this.saveActivityRepository.save(data)
    return null
  }
}
