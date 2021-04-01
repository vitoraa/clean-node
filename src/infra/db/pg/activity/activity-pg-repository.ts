import { InsertActivityRepository } from '@/data/protocols/db/activity/save-activity-repository'
import { ActivityModel } from '@/domain/models/activity'
import { CreateActivityModel } from '@/domain/usecases/activity/insert-activity'
import { PostgresHelper } from '../helpers/pg-helper'

export class ActivityMongoRepository implements InsertActivityRepository {
  private async update (activity: CreateActivityModel, id: string): Promise<ActivityModel> {
    const text = 'UPDATE activity SET account_id=$1, ship_id=$2, date=$3 WHERE id=$4 RETURNING *'
    const values = [activity.accountId, activity.shipId, activity.date, id]
    const activityUpdated = await PostgresHelper.client.query(text, values)
    return activityUpdated.rows[0]
  }

  async insert (activity: CreateActivityModel): Promise<ActivityModel> {
    const text = 'INSERT INTO activity(ship_id, date, account_id) VALUES($1, $2, $3) RETURNING *'
    const values = [activity.shipId, activity.date, activity.accountId]
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