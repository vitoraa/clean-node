import { HttpRequest, HttpResponse, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../erros'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmation } = httpRequest.body
      const emailValid = this.emailValidator.isValid(email)
      if (!emailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const passwordConfirmationValid = password === passwordConfirmation
      if (!passwordConfirmationValid) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
