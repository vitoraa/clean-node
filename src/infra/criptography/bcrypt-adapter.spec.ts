import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt-adapter'

const makeSut = (salt: number = 12): BCryptAdapter => {
  return new BCryptAdapter(salt)
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  },
  async compare (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }

}))

describe('BCrypt Adapter', () => {
  test('Should call hash with corrects values', async () => {
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    const salt = 12
    const sut = makeSut(salt)
    await sut.hash('value')
    expect(bcryptSpy).toHaveBeenCalledWith('value', salt)
  })

  test('Should return an string on hash success', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('value_hashed')
    const sut = makeSut()
    const hashedValue = await sut.hash('value')
    expect(hashedValue).toBe('value_hashed')
  })

  test('Should throw if Bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.hash('value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with corrects values', async () => {
    const bcryptSpy = jest.spyOn(bcrypt, 'compare')
    const salt = 12
    const sut = makeSut(salt)
    await sut.compare('id', 'access_token')
    expect(bcryptSpy).toHaveBeenCalledWith('id', 'access_token')
  })

  test('Should return an boolean on compare success', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true)
    const sut = makeSut()
    const isValid = await sut.compare('id', 'access_token')
    expect(isValid).toBe(true)
  })
})
