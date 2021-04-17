import { ActivityModel } from '@/domain/models/activity'

export interface AddActivity {
  add: (data: AddActivity.Params) => Promise<AddActivity.Result>
}

export namespace AddActivity {
  export type Params = {
    shipId: string
    accountId: string
  }

  export type Result = ActivityModel
}
