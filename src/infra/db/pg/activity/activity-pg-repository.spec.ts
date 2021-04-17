import { PostgresHelper } from '../helpers/pg-helper'
import { ActivityPostgresRepository } from './activity-pg-repository'
import MockDate from 'mockdate'
import { mockAddActivityParams } from '@/domain/test'
import env from '@/main/config/env'
import { UpdateActivity } from '@/domain/usecases/activity/update-activity'

const mockUpdateActivityParams = (): UpdateActivity.Params => ({
  accountId: 'account_id_other',
  shipId: 'ship_id_other'
})

type SutTypes = {
  sut: ActivityPostgresRepository
}

const makeSut = (): SutTypes => {
  const sut = new ActivityPostgresRepository()
  return { sut }
}

describe('Activity Postgres Repository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await PostgresHelper.connect(env.pgUrl)
  })

  afterAll(async () => {
    MockDate.reset()
    await PostgresHelper.disconnect()
  })

  beforeEach(async () => {
    await PostgresHelper.client.query('DELETE FROM activity')
  })

  test('Should return an activity on insert success', async () => {
    const { sut } = makeSut()
    const activity = await sut.insert(mockAddActivityParams())
    expect(activity).toBeTruthy()
    expect(activity.id).toBeTruthy()
    expect(activity.accountId).toBe('account_id')
    expect(activity.shipId).toBe('ship_id')
    expect(activity.date).toEqual(new Date())
  })

  test('Should return an activity on update success', async () => {
    const { sut } = makeSut()
    const newActivity = await sut.insert(mockAddActivityParams())
    const updateActivity = await sut.update(mockUpdateActivityParams(), newActivity.id)
    expect(updateActivity).toBeTruthy()
    expect(updateActivity.id).toBeTruthy()
    expect(updateActivity.accountId).toBe('account_id_other')
    expect(updateActivity.shipId).toBe('ship_id_other')
    expect(updateActivity.date).toEqual(new Date())
  })
})
