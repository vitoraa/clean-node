import { ActivityModel } from '@/domain/models/activity'

export interface UpdateActivity {
  update: (data: UpdateActivity.Params, id: string) => Promise<UpdateActivity.Result>
}

export namespace UpdateActivity {
  export type Params = {
    shipId: string
    accountId: string
  }

  export type Result = ActivityModel
}
