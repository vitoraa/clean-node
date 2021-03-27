import { LoadShips } from '../../../../domain/usecases/load-ships'
import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { Validation } from '../../signup/signup-controller-protocols'

export class LoadShipsController implements Controller {
  constructor (
    private readonly loadShips: LoadShips,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    await this.loadShips.load(httpRequest.body)
    return null
  }
}
