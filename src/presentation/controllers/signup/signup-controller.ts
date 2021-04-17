import { HttpResponse, Controller, AddAccount } from './signup-controller-protocols'
import { badRequest, forbidden, ok, serverError } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
import { Authentication } from '../login/login-controller-protocols'
import { FieldInUseError } from '../../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) { }

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = request

      const isValid = await this.addAccount.add({ email, password, name })

      if (!isValid) {
        return forbidden(new FieldInUseError('Email'))
      }

      const accessToken = await this.authentication.auth({ email, password })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
