import { CreateActivityModel } from '@/domain/usecases/activity/insert-activity'
import env from '@/main/config/env'
import { PostgresHelper } from '../helpers/pg-helper'
import { ActivityMongoRepository } from './activity-pg-repository'

import MockDate from 'mockdate'
import { UpdateActivityModel } from '@/domain/usecases/activity/update-activity'

const makeFakeUpdateActivityModel = (): UpdateActivityModel => ({
  date: new Date(),
  accountId: 'account_id_other',
  shipId: 'ship_id_other'
})

const makeFakeSaveActivityModel = (): CreateActivityModel => ({
  date: new Date(),
  accountId: 'account_id',
  shipId: 'ship_id'
})

type SutTypes = {
  sut: ActivityMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new ActivityMongoRepository()
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

  test('Should return an activity on insert success', async () => {
    const { sut } = makeSut()
    const activity = await sut.insert(makeFakeSaveActivityModel())
    expect(activity).toBeTruthy()
    expect(activity.id).toBeTruthy()
    expect(activity.accountId).toBe('account_id')
    expect(activity.shipId).toBe('ship_id')
    expect(activity.date).toEqual(new Date())
  })

  test('Should return an activity on update success', async () => {
    const { sut } = makeSut()
    const newActivity = await sut.insert(makeFakeSaveActivityModel())
    const updateActivity = await sut.update(makeFakeUpdateActivityModel(), newActivity.id)
    expect(updateActivity).toBeTruthy()
    expect(updateActivity.id).toBeTruthy()
    expect(updateActivity.accountId).toBe('account_id_other')
    expect(updateActivity.shipId).toBe('ship_id_other')
    expect(updateActivity.date).toEqual(new Date())
  })
})
