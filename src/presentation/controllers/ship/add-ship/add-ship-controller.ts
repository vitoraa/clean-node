import { AddShip } from '../../../../domain/usecases/add-ship'
import { serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'

export class AddShipController implements Controller {
  constructor (private readonly addShip: AddShip) { }
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, ab } = httpRequest.body
      await this.addShip.add({ name, ab })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
