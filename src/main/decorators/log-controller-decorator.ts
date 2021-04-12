import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (private readonly controller: Controller, private readonly logErrorRepository: LogErrorRepository) { }

  async handle (request: any): Promise<HttpResponse> {
    const httResponse = await this.controller.handle(request)
    if (httResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httResponse.body.stack)
    }
    return httResponse
  }
}
