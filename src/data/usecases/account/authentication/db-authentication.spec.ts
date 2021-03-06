import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { DbAuthentication } from './db-authentication'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { mockAccountModel, mockAuthenticationParams, throwError } from '@/domain/test'
import { mockEncrypter, mockHashComparer, mockLoadAccountByEmailRepository, mockUpdateAccessTokenRepository } from '@/data/test'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const encrypterStub = mockEncrypter()
  const hashComparerStub = mockHashComparer()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadAccountByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const fakeAuthentication = mockAuthenticationParams()
    await sut.auth(fakeAuthentication)
    expect(loadAccountByEmailSpy).toHaveBeenCalledWith(fakeAuthentication.email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementation(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if no account is found', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBeNull()
  })

  test('Should calls HashComparer with correct params', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    const fakeAuthentication = mockAuthenticationParams()
    await sut.auth(fakeAuthentication)
    expect(compareSpy).toHaveBeenCalledWith(fakeAuthentication.password, mockAccountModel().password)
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockImplementation(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashCompare returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBeNull()
  })

  test('Should calls Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockAuthenticationParams())
    expect(generateSpy).toHaveBeenCalledWith(mockAccountModel().id)
  })

  test('Should returns accesstoken if Encrypter succeeds', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBe('access_token')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementation(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should calls UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const generateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockAuthenticationParams())
    expect(generateSpy).toHaveBeenCalledWith(mockAccountModel().id, 'access_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementation(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
})
