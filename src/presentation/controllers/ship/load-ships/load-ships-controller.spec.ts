import { ShipModel } from '@/domain/models/ship'
import { LoadShips, LoadShipsParams } from '@/domain/usecases/ship/load-ships'
import { HttpRequest } from '@/presentation/protocols'
import { Validation } from '../../signup/signup-controller-protocols'
import { LoadShipsController } from './load-ships-controller'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { throwError } from '@/domain/test'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_ship',
    ab: 20
  }
})

const makeFakeResponse = (): ShipModel[] => ([{
  id: 'any_id',
  name: 'any_ship',
  ab: 20,
  imo: 'any_imo'
}, {
  id: 'any_id_2',
  name: 'any_ship_2',
  ab: 20,
  imo: 'any_imo_2'
}])

const makeAddShip = (): LoadShips => {
  class LoadShipsStub implements LoadShips {
    async load (params: LoadShipsParams): Promise<ShipModel[]> {
      return makeFakeResponse()
    }
  }
  return new LoadShipsStub()
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
  sut: LoadShipsController
  loadShipsStub: LoadShips
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const loadShipsStub = makeAddShip()
  const sut = new LoadShipsController(loadShipsStub, validationStub)
  return { sut, loadShipsStub, validationStub }
}

describe('Add Ship Controller', () => {
  test('Should call LoadShips with corrects params', async () => {
    const { sut, loadShipsStub } = makeSut()
    const loadSpy = jest.spyOn(loadShipsStub, 'load')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 404 if LoadShips returns empty', async () => {
    const { sut, loadShipsStub } = makeSut()
    jest.spyOn(loadShipsStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(notFound({}))
  })

  test('Should return 200 if LoadShips succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeResponse()))
  })

  test('Should thows 500 if LoadShips throws', async () => {
    const { sut, loadShipsStub } = makeSut()
    jest.spyOn(loadShipsStub, 'load').mockImplementation(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should call Validation with corrects params', async () => {
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
