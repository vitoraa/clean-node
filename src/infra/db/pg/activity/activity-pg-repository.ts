import { InsertActivityRepository, UpdateActivityRepository } from '@/data/protocols/db/activity/save-activity-repository'
import { ActivityModel } from '@/domain/models/activity'
import { AddActivityParams } from '@/domain/usecases/activity/add-activity'
import { UpdateActivityParams } from '@/domain/usecases/activity/update-activity'
import { PostgresHelper } from '../helpers/pg-helper'

export class ActivityPostgresRepository implements InsertActivityRepository, UpdateActivityRepository {
  async update (activity: UpdateActivityParams, id: string): Promise<ActivityModel> {
    const text = 'UPDATE activity SET account_id=$1, ship_id=$2 WHERE id=$3 RETURNING *'
    const values = [activity.accountId, activity.shipId, id]
    const activityUpdated = await PostgresHelper.client.query(text, values)
    return this.map(activityUpdated.rows[0])
  }

  async insert (activity: AddActivityParams): Promise<ActivityModel> {
    const text = 'INSERT INTO activity(ship_id, date, account_id) VALUES($1, $2, $3) RETURNING *'
    const values = [activity.shipId, new Date(), activity.accountId]
    const activityInserted = await PostgresHelper.client.query(text, values)
    return this.map(activityInserted.rows[0])
  }

  private map (data: any): ActivityModel {
    return {
      accountId: data.account_id,
      date: data.date,
      id: data.id,
      shipId: data.ship_id
    }
  }
}
