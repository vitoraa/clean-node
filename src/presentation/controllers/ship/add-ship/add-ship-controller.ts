import { AddShip } from '../../../../domain/usecases/add-ship'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../login/login-controller-protocols'

export class AddShipController implements Controller {
  constructor (
    private readonly addShip: AddShip,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest.body)
      const { name, ab } = httpRequest.body
      const ship = await this.addShip.add({ name, ab })
      return ok(ship)
    } catch (error) {
      return serverError(error)
    }
  }
}
