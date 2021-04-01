import { ActivityModel } from '@/domain/models/activity'

export interface AddActivity {
  add: (data: AddActivityModel) => Promise<ActivityModel>
}

export type AddActivityModel = Omit<ActivityModel, 'id'>
