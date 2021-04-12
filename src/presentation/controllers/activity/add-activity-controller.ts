import { AddActivity } from '@/domain/usecases/activity/add-activity'
import { LoadShipById } from '@/domain/usecases/ship/load-ship-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'

export class AddActivityController implements Controller {
  constructor (
    private readonly addActivity: AddActivity,
    private readonly validation: Validation,
    private readonly loadShipById: LoadShipById
  ) { }

  async handle (request: AddActivityController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      const ship = await this.loadShipById.loadById(request.shipId)

      if (!ship) {
        return forbidden(new InvalidParamError('shipId'))
      }

      const activity = await this.addActivity.add(request)

      return ok(activity)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddActivityController {
  export type Request = {
    shipId: string
    accountId: string
  }
}
