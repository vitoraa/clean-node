import { LoadAccountByTokenRepository } from '../../data/protocols/db/account/load-account-by-token-repository'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken)
    }
    return forbidden(new AccessDeniedError())
  }
}
