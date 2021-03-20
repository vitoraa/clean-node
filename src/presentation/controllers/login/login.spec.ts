import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { EmailValidator } from '../signup/signup-protocols'
import { LoginController } from './login'

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Login Controller', () => {
  test('Should return 400 if email is no provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if password is no provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if email is no valid', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest = {
      body: {
        email: 'invalid@email.com',
        password: 'any_password'
      }
    }
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Should thows 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
})
