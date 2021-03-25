import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByTokenRepository } from '../../data/protocols/db/account/load-account-by-token-repository'
import { AccountModel } from '../../domain/models/account'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  email: 'valid_email@email.com.br',
  name: 'valid_name',
  password: 'valid_password'
})

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const sut = new AuthMiddleware(loadAccountByTokenRepositoryStub)
  return { sut, loadAccountByTokenRepositoryStub }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct AccessToken', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const spyLoad = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(spyLoad).toHaveBeenCalledWith('any_token')
  })
})
