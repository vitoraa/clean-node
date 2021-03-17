import request from 'supertest'
import app from '../config/app'

describe('SingUp Routes', () => {
  test('Should return 200 on post', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Vitor',
        email: 'vitor@gmail.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
