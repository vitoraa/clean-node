import { AddShip } from '../../../../domain/usecases/add-ship'
import { FieldInUseError } from '../../../errors/field-in-use-error'
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../login/login-controller-protocols'

export class AddShipController implements Controller {
  constructor (
    private readonly addShip: AddShip,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      // const { name, ab } = httpRequest.body
      const ship = await this.addShip.add(httpRequest.body)

      if (!ship) {
        return forbidden(new FieldInUseError('Imo'))
      }

      return ok(ship)
    } catch (error) {
      return serverError(error)
    }
  }
}
