import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { AddActivityController } from './add-activity-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accountId: 'any_account',
    shipId: 'any_ship'
  }
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: AddActivityController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new AddActivityController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('Save Activity Controller', () => {
  test('Should call Validation with corrects params', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith({
      accountId: 'any_account',
      shipId: 'any_ship'
    })
  })
})
