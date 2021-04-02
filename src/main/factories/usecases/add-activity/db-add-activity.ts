import { DbSaveActivity } from '@/data/usecases/activity/save-activity/db-save-activity'
import { AddActivity } from '@/domain/usecases/activity/add-activity'
import { ActivityPostgresRepository } from '@/infra/db/pg/activity/activity-pg-repository'

export const makeDbAddActivity = (): AddActivity => {
  const activityPostgresRepository = new ActivityPostgresRepository()
  return new DbSaveActivity(activityPostgresRepository, activityPostgresRepository)
}
