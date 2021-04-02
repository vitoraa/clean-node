import { PostgresHelper } from '@/infra/db/pg/helpers/pg-helper'
import MockDate from 'mockdate'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'

describe('Activity Routes', () => {
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

  describe('POST /activity', () => {
    test('Should return 403 on add activity without accessToken', async () => {
      await request(app)
        .post('/api/ships/any_id/activity')
        .send({
          shipId: 'any id_ship',
          accountId: 'any_account_id'
        })
        .expect(403)
    })
  })
})
