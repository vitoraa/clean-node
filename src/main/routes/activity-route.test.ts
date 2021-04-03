import { PostgresHelper } from '@/infra/db/pg/helpers/pg-helper'
import { Collection } from 'mongodb'
import request from 'supertest'
import { sign } from 'jsonwebtoken'
import app from '../config/app'
import env from '../config/env'
import MockDate from 'mockdate'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

let shipCollection: Collection
let accountCollection: Collection

const createFakeShip = async (): Promise<string> => {
  const res = await shipCollection.insertOne({
    name: 'any_name',
    imo: 'any_imo',
    ab: 30
  })
  return res.ops[0]._id
}

const createFakeAdminAccount = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Vitor',
    email: 'vitor@gmail.com',
    password: 'password'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Activity Routes', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(process.env.MONGO_URL)
    await PostgresHelper.connect(process.env.PG_URL)
  })

  afterAll(async () => {
    MockDate.reset()
    await PostgresHelper.disconnect()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await PostgresHelper.client.query('DELETE FROM activity')
    accountCollection = await MongoHelper.getCollection('accounts')
    shipCollection = await MongoHelper.getCollection('ships')
    await shipCollection.deleteMany({})
    await accountCollection.deleteMany({})
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

  test('Should return 200 on add activity with valid accessToken', async () => {
    const accessToken = await createFakeAdminAccount()
    const shipId = await createFakeShip()
    await request(app)
      .post(`/api/ships/${shipId}/activity`)
      .set('x-access-token', accessToken)
      .send({
        shipId,
        accountId: 'any_account_id'
      })
      .expect(200)
  })
})
