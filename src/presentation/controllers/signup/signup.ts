import { HttpRequest, HttpResponse, EmailValidator, Controller, AddAccount } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../erros'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body
      const emailValid = this.emailValidator.isValid(email)
      if (!emailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const passwordConfirmationValid = password === passwordConfirmation
      if (!passwordConfirmationValid) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const account = await this.addAccount.add({ email, password, name })
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
