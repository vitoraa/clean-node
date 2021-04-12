import { AddShip } from '@/domain/usecases/ship/add-ship'
import { FieldInUseError } from '@/presentation/errors/field-in-use-error'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { Validation } from '../../login/login-controller-protocols'

export class AddShipController implements Controller {
  constructor (
    private readonly addShip: AddShip,
    private readonly validation: Validation
  ) { }

  async handle (request: AddShipController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      // const { name, ab } = request.body
      const ship = await this.addShip.add(request)

      if (!ship) {
        return forbidden(new FieldInUseError('Imo'))
      }

      return ok(ship)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddShipController {
  export type Request = {
    name: string
    ab: number
    imo: string
  }
}
