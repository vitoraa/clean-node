import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

jest.spyOn(validator, 'isEmail').mockReturnValue(true)

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const sut = makeSut()
    const validatorSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@email.com')
    expect(validatorSpy).toHaveBeenCalledWith('any_email@email.com')
  })
})
