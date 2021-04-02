import { AddActivity } from '@/domain/usecases/activity/add-activity'
import { LoadShipById } from '@/domain/usecases/ship/load-ship-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'

export class AddActivityController implements Controller {
  constructor (
    private readonly addActivity: AddActivity,
    private readonly validation: Validation,
    private readonly loadShipById: LoadShipById
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const ship = await this.loadShipById.loadById(httpRequest.params.shipId)

      if (!ship) {
        return forbidden(new InvalidParamError('shipId'))
      }

      const activity = await this.addActivity.add(httpRequest.body)

      return ok(activity)
    } catch (error) {
      return serverError(error)
    }
  }
}
