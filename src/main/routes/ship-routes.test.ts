import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let shipCollection: Collection
let accountCollection: Collection

const createFakeAdminAccount = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Vitor',
    email: 'vitor@gmail.com',
    password: 'password',
    role: 'admin'
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

const createFakeAccount = async (): Promise<string> => {
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

const createFakeShips = async (): Promise<void> => {
  await shipCollection.insertMany([{
    name: 'any_name',
    imo: 'any_imo',
    ab: 30
  }, {
    name: 'other_name',
    imo: 'other_imo',
    ab: 50
  }])
}

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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /ship', () => {
    test('Should return 403 on add ship without accessToken', async () => {
      await request(app)
        .post('/api/ships')
        .send({
          name: 'any name',
          imo: 'any_imo',
          ab: 123
        })
        .expect(403)
    })

    test('Should return 200 on add ship with valid accessToken', async () => {
      const accessToken = await createFakeAdminAccount()
      await request(app)
        .post('/api/ships')
        .set('x-access-token', accessToken)
        .send({
          name: 'any name',
          imo: 'any_imo',
          ab: 123
        })
        .expect(200)
    })

    test('Should return 400 on add ship if required field is missing', async () => {
      const accessToken = await createFakeAdminAccount()
      await request(app)
        .post('/api/ships')
        .set('x-access-token', accessToken)
        .send({
          name: 'any name',
          imo: 'any_imo'
        })
        .expect(400)
    })
  })

  describe('GET /ship', () => {
    test('Should return 403 on load ships without accessToken', async () => {
      await request(app)
        .get('/api/ships')
        .send({
          name: 'any name',
          imo: 'any_imo',
          ab: 123
        })
        .expect(403)
    })

    test('Should return 200 on load ships with admin accessToken', async () => {
      await createFakeShips()
      const accessToken = await createFakeAdminAccount()
      await request(app)
        .get('/api/ships')
        .set('x-access-token', accessToken)
        .send({
          name: 'any name',
          imo: 'any_imo',
          ab: 123
        })
        .expect(200)
    })

    test('Should return 200 on load ships with authenticated accessToken', async () => {
      await createFakeShips()
      const accessToken = await createFakeAccount()
      await request(app)
        .get('/api/ships')
        .set('x-access-token', accessToken)
        .send({
          name: 'any name',
          imo: 'any_imo',
          ab: 123
        })
        .expect(200)
    })

    test('Should return 404 on load ships if there is no ships', async () => {
      const accessToken = await createFakeAccount()
      await request(app)
        .get('/api/ships')
        .set('x-access-token', accessToken)
        .send({
          name: 'any name',
          imo: 'any_imo',
          ab: 123
        })
        .expect(404)
    })
  })
})
