import { ActivityModel } from '@/domain/models/activity'
import { AddActivityParams } from '@/domain/usecases/activity/add-activity'
import { UpdateActivityParams } from '@/domain/usecases/activity/update-activity'

export interface InsertActivityRepository {
  insert: (activity: AddActivityParams) => Promise<ActivityModel>
}

export interface UpdateActivityRepository {
  update: (activity: UpdateActivityParams, id: string) => Promise<ActivityModel>
}
