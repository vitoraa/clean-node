import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt-adapter'

describe('BCrypt Adapter', () => {
  test('Should call encrypt with corrects values', async () => {
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    const salt = 12
    const sut = new BCryptAdapter(salt)
    await sut.encrypt('password')
    expect(bcryptSpy).toHaveBeenCalledWith('password', salt)
  })
})
