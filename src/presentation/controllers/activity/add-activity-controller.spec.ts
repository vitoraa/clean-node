import { ActivityModel } from '@/domain/models/activity'
import { ShipModel } from '@/domain/models/ship'
import { AddActivity } from '@/domain/usecases/activity/add-activity'
import { LoadShipById } from '@/domain/usecases/ship/load-ship-by-id'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'
import { AddActivityController } from './add-activity-controller'
import MockDate from 'mockdate'
import { mockShipModel, throwError } from '@/domain/test'

const makeFakeRequest = (): AddActivityController.Request => ({
  accountId: 'any_account',
  shipId: 'any_ship'
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
    async add (data: AddActivity.Params): Promise<AddActivity.Result> {
      return makeFakeResponse()
    }
  }
  return new AddActivityStub()
}

const makeLoadShipById = (): LoadShipById => {
  class LoadShipByIdStub implements LoadShipById {
    async loadById (id: string): Promise<ShipModel> {
      return mockShipModel()
    }
  }
  return new LoadShipByIdStub()
}

type SutTypes = {
  sut: AddActivityController
  validationStub: Validation
  addActivityStub: AddActivity
  loadShipByIdStub: LoadShipById
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addActivityStub = makeAddActivity()
  const loadShipByIdStub = makeLoadShipById()
  const sut = new AddActivityController(addActivityStub, validationStub, loadShipByIdStub)
  return {
    sut,
    validationStub,
    addActivityStub,
    loadShipByIdStub
  }
}

describe('Save Activity Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadShipById with corrects params', async () => {
    const { sut, loadShipByIdStub } = makeSut()
    const validateSpy = jest.spyOn(loadShipByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(validateSpy).toHaveBeenCalledWith('any_ship')
  })

  test('Should return 403 if LoadShipById returns null', async () => {
    const { sut, loadShipByIdStub } = makeSut()
    jest.spyOn(loadShipByIdStub, 'loadById').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('shipId')))
  })

  test('Should throws 500 if LoadShipById throws', async () => {
    const { sut, loadShipByIdStub } = makeSut()
    jest.spyOn(loadShipByIdStub, 'loadById').mockImplementation(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

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
    jest.spyOn(validationStub, 'validate').mockImplementation(throwError)
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

  test('Should throws 500 if AddActivity throws', async () => {
    const { sut, addActivityStub } = makeSut()
    jest.spyOn(addActivityStub, 'add').mockImplementation(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if AddActivity succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeResponse()))
  })
})
