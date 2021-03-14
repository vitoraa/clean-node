import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: EncrypterStub
}

class EncrypterStub implements Encrypter {
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => resolve('hashed_password'))
  }
}

const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub()
  const sut = new DbAddAccount(encrypterStub)
  return { sut, encrypterStub }
}

describe('DbAddAccount', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add({
      email: 'valid_email@com',
      name: 'valid_name',
      password: 'valid_password'
    })
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
