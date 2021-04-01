import { ActivityModel } from '@/domain/models/activity'
import { AddActivityModel } from '@/domain/usecases/activity/add-activity'
import { UpdateActivityModel } from '@/domain/usecases/activity/update-activity'

export interface InsertActivityRepository {
  insert: (activity: AddActivityModel) => Promise<ActivityModel>
}

export interface UpdateActivityRepository {
  update: (activity: UpdateActivityModel, id: string) => Promise<ActivityModel>
}
