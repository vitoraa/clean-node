import { ActivityModel } from '@/domain/models/activity'

export interface SaveActivity {
  save: (data: SaveActivityModel) => Promise<ActivityModel>
}

export type SaveActivityModel = Omit<ActivityModel, 'id'>
