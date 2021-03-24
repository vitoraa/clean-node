import { AddShip, AddShipModel } from '../../../../domain/usecases/add-ship'
import { ShipModel } from '../../../../domain/models/ship'
import { ServerError } from '../../../errors'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { HttpRequest } from '../../../protocols'
import { AddShipController } from './add-ship-controller'

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

interface SutTypes {
  sut: AddShipController
  addShipStub: AddShip
}

const makeSut = (): SutTypes => {
  const addShipStub = makeAddShip()
  const sut = new AddShipController(addShipStub)
  return { sut, addShipStub }
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
})
