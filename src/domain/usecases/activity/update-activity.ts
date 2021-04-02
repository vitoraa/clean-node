import { ActivityModel } from '@/domain/models/activity'

export interface UpdateActivity {
  update: (data: UpdateActivityModel, id: string) => Promise<ActivityModel>
}

export type UpdateActivityModel = Omit<ActivityModel, 'id' | 'date'>
