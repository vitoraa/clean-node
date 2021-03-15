import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt-adapter'

const makeSut = (salt: number = 12): BCryptAdapter => {
  return new BCryptAdapter(salt)
}

describe('BCrypt Adapter', () => {
  test('Should call encrypt with corrects values', async () => {
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    const salt = 12
    const sut = makeSut(salt)
    await sut.encrypt('value')
    expect(bcryptSpy).toHaveBeenCalledWith('value', salt)
  })

  test('Should return an string on success', async () => {
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('value_encrypted')
    const sut = makeSut()
    const encryptedValue = await sut.encrypt('value')
    expect(encryptedValue).toBe('value_encrypted')
  })

  test('Should throw if Bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.encrypt('value')
    await expect(promise).rejects.toThrow()
  })
})
