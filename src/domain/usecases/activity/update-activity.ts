import { ActivityModel } from '@/domain/models/activity'

export interface UpdateActivity {
  update: (data: UpdateActivityParams, id: string) => Promise<ActivityModel>
}

export type UpdateActivityParams = Omit<ActivityModel, 'id' | 'date'>
