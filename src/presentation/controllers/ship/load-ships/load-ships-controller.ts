import { LoadShips } from '@/domain/usecases/ship/load-ships'
import { badRequest, notFound, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '../../signup/signup-controller-protocols'

export class LoadShipsController implements Controller {
  constructor (
    private readonly loadShips: LoadShips,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const ships = await this.loadShips.load(httpRequest.body)
      if (ships.length) {
        return ok(ships)
      }
      return notFound({})
    } catch (error) {
      return serverError(error)
    }
  }
}
