import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
    return await new Promise(resolve => resolve(null))
  }
}

const makeSut = (): any => {
  return new LoginController()
}

describe('Login Controller', () => {
  test('Should return 400 if email is no provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
