import { LoadShips } from '@/domain/usecases/ship/load-ships'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { Validation } from '../../signup/signup-controller-protocols'

export class LoadShipsController implements Controller {
  constructor (
    private readonly loadShips: LoadShips,
    private readonly validation: Validation
  ) { }

  async handle (request: LoadShipsController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const ships = await this.loadShips.load(request)
      if (ships.length) {
        return ok(ships)
      }
      return notFound({})
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadShipsController {
  export type Request = {
    name: string
    imo: string
    ab: number
  }
}
