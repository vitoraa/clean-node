import { AddActivity } from '@/domain/usecases/activity/add-activity'
import { UpdateActivity } from '@/domain/usecases/activity/update-activity'

export interface InsertActivityRepository {
  insert: (activity: InsertActivityRepository.Params) => Promise<InsertActivityRepository.Result>
}

export interface UpdateActivityRepository {
  update: (activity: UpdateActivityRepository.Params, id: string) => Promise<UpdateActivityRepository.Result>
}

export namespace InsertActivityRepository {
  export type Params = AddActivity.Params
  export type Result = AddActivity.Result
}

export namespace UpdateActivityRepository {
  export type Params = UpdateActivity.Params
  export type Result = UpdateActivity.Result
}
