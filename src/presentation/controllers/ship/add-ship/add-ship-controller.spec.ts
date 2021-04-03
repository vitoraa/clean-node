import { ShipModel } from '@/domain/models/ship'
import { FieldInUseError, MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { AddShipController } from './add-ship-controller'
import { Validation } from '../../login/login-controller-protocols'
import { AddShip, AddShipParams } from '@/domain/usecases/ship/add-ship'
import { throwError } from '@/domain/test'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_ship',
    ab: 20
  }
})

const makeFakeResponse = (): ShipModel => ({
  id: 'any_id',
  name: 'any_ship',
  ab: 20,
  imo: 'any_imo'
})

const makeAddShip = (): AddShip => {
  class AddShipStub implements AddShip {
    async add (ship: AddShipParams): Promise<ShipModel> {
      return makeFakeResponse()
    }
  }
  return new AddShipStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: AddShipController
  addShipStub: AddShip
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addShipStub = makeAddShip()
  const sut = new AddShipController(addShipStub, validationStub)
  return { sut, addShipStub, validationStub }
}

describe('Add Ship Controller', () => {
  test('Should call AddShip with corrects params', async () => {
    const { sut, addShipStub } = makeSut()
    const addSpy = jest.spyOn(addShipStub, 'add')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should thows 500 if AddShip throws', async () => {
    const { sut, addShipStub } = makeSut()
    jest.spyOn(addShipStub, 'add').mockImplementation(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 200 if AddShip succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeResponse()))
  })

  test('Should return 403 if AddShip returns null', async () => {
    const { sut, addShipStub } = makeSut()
    jest.spyOn(addShipStub, 'add').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new FieldInUseError('Imo')))
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should throws 500 if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementation(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
