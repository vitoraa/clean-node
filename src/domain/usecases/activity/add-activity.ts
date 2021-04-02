import { ActivityModel } from '@/domain/models/activity'

export interface AddActivity {
  add: (data: AddActivityParams) => Promise<ActivityModel>
}

export type AddActivityParams = Omit<ActivityModel, 'id' | 'date'>
