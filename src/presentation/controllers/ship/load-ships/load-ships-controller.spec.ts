import { ShipModel } from '../../../../domain/models/ship'
import { LoadShips, LoadShipsModel } from '../../../../domain/usecases/load-ships'
import { HttpRequest } from '../../../protocols'
import { Validation } from '../../signup/signup-controller-protocols'
import { LoadShipsController } from './load-ships-controller'

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
    async load (ship: LoadShipsModel): Promise<ShipModel[]> {
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

interface SutTypes {
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

  test('Should call Validation with corrects params', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })
})
