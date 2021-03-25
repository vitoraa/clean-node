import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let shipCollection: Collection

describe('Ship Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    shipCollection = await MongoHelper.getCollection('ships')
    await shipCollection.deleteMany({})
  })

  describe('POST /ship', () => {
    test('Should return 200 on add ship', async () => {
      await request(app)
        .post('/api/ships')
        .send({
          name: 'any name',
          imo: 'any_imo',
          ab: 123
        })
        .expect(200)
    })

    test('Should return 400 on add ship if required field is missing', async () => {
      await request(app)
        .post('/api/ships')
        .send({
          name: 'any name',
          imo: 'any_imo'
        })
        .expect(400)
    })
  })
})
