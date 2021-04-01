import { AddActivity } from '@/domain/usecases/activity/add-activity'
import { badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'

export class AddActivityController implements Controller {
  constructor (
    private readonly addActivity: AddActivity,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      await this.addActivity.add(httpRequest.body)
    } catch (error) {
      return serverError(error)
    }
    return null
  }
}
