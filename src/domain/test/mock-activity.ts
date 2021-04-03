import { ActivityModel } from '../models/activity'
import { AddActivityParams } from '../usecases/activity/add-activity'
import { UpdateActivityParams } from '../usecases/activity/update-activity'

export const mockAddActivityParams = (): AddActivityParams => ({
  accountId: 'account_id',
  shipId: 'ship_id'
})

export const mockUpdateActivityParams = (): UpdateActivityParams => ({
  accountId: 'account_id',
  shipId: 'ship_id'
})

export const mockActivityModel = (): ActivityModel => Object.assign(
  {}, mockAddActivityParams(), { id: 'any_id', date: new Date() }
)
