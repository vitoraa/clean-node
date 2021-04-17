import { ActivityModel } from '../models/activity'
import { AddActivity } from '../usecases/activity/add-activity'
import { UpdateActivity } from '../usecases/activity/update-activity'

export const mockAddActivityParams = (): AddActivity.Params => ({
  accountId: 'account_id',
  shipId: 'ship_id'
})

export const mockUpdateActivityParams = (): UpdateActivity.Params => ({
  accountId: 'account_id',
  shipId: 'ship_id'
})

export const mockActivityModel = (): ActivityModel => Object.assign(
  {}, mockAddActivityParams(), { id: 'any_id', date: new Date() }
)
