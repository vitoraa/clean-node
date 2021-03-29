import { ActivityModel } from '@/domain/models/activity'
import { SaveActivityModel } from '@/domain/usecases/activity/save-activity'

export interface SaveActivityRepository {
  save: (activity: SaveActivityModel) => Promise<ActivityModel>
}
