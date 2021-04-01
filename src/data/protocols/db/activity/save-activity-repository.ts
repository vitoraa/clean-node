import { ActivityModel } from '@/domain/models/activity'
import { CreateActivityModel } from '@/domain/usecases/activity/insert-activity'

export interface InsertActivityRepository {
  insert: (activity: CreateActivityModel) => Promise<ActivityModel>
}

export interface UpdateActivityRepository {
  update: (activity: CreateActivityModel, id: string) => Promise<ActivityModel>
}
