import { ActivityModel } from '@/domain/models/activity'

export interface InsertActivity {
  insert: (data: CreateActivityModel) => Promise<ActivityModel>
}

export type CreateActivityModel = Omit<ActivityModel, 'id'>
