import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '../../presentation/protocols/validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: Validation
  validationStubs: Validation[]
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStubs = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStubs)
  return { sut, validationStubs }
}

describe('Validation Composite', () => {
  test('Should return an Error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new InvalidParamError('anyToCompare'))
    const error = sut.validate({ any: 'any' })
    expect(error).toEqual(new InvalidParamError('anyToCompare'))
  })

  test('Should return the first error if more than one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new InvalidParamError('anyToCompare'))
    const error = sut.validate({ any: 'any' })
    expect(error).toEqual(new Error())
  })

  test('Should return nothing if all validations succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any: 'any' })
    expect(error).toBeFalsy()
  })
})
