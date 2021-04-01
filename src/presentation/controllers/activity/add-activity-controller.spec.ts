import { ActivityModel } from '@/domain/models/activity'
import { AddActivity, AddActivityModel } from '@/domain/usecases/activity/add-activity'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { AddActivityController } from './add-activity-controller'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    accountId: 'any_account',
    shipId: 'any_ship'
  }
})

const makeFakeResponse = (): ActivityModel => ({
  id: 'any_id',
  accountId: 'any_account',
  shipId: 'any_ship',
  date: new Date()
})

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddActivity = (): AddActivity => {
  class AddActivityStub implements AddActivity {
    async add (data: AddActivityModel): Promise<ActivityModel> {
      return makeFakeResponse()
    }
  }
  return new AddActivityStub()
}

type SutTypes = {
  sut: AddActivityController
  validationStub: Validation
  addActivityStub: AddActivity
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addActivityStub = makeAddActivity()
  const sut = new AddActivityController(addActivityStub, validationStub)
  return {
    sut,
    validationStub,
    addActivityStub
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

  test('Should throws 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementation(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should call AddActivity with corrects params', async () => {
    const { sut, addActivityStub } = makeSut()
    const addSpy = jest.spyOn(addActivityStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      accountId: 'any_account',
      shipId: 'any_ship'
    })
  })
})
