import { AddShip, AddShipModel } from '../../../../domain/usecases/add-ship'
import { ShipModel } from '../../../../domain/models/ship'
import { MissingParamError, ServerError } from '../../../errors'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { HttpRequest } from '../../../protocols'
import { AddShipController } from './add-ship-controller'
import { Validation } from '../../login/login-controller-protocols'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_ship',
    ab: 20
  }
})

const makeFakeResponse = (): ShipModel => ({
  name: 'any_ship',
  ab: 20
})

const makeAddShip = (): AddShip => {
  class AddShipStub implements AddShip {
    async add (ship: AddShipModel): Promise<ShipModel> {
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

interface SutTypes {
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
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_ship',
      ab: 20
    })
  })

  test('Should thows 500 if AddShip throws', async () => {
    const { sut, addShipStub } = makeSut()
    jest.spyOn(addShipStub, 'add').mockImplementation(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 200 if AddShip succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeResponse()))
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
    jest.spyOn(validationStub, 'validate').mockImplementation(() => {
      throw new Error()
    })
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
