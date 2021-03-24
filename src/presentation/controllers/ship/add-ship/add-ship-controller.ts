import { AddShip } from '../../../../domain/usecases/add-ship'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class AddShipController implements Controller {
  constructor (private readonly addShip: AddShip) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, ab } = httpRequest.body
      const ship = await this.addShip.add({ name, ab })
      return ok(ship)
    } catch (error) {
      return serverError(error)
    }
  }
}
