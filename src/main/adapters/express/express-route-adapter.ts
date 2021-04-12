import { Controller } from '@/presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      accountId: req.accountId
    }
    const httResponse = await controller.handle(request)
    if (httResponse.statusCode === 200) {
      res.status(httResponse.statusCode).json(httResponse.body)
    } else {
      res.status(httResponse.statusCode).json({
        error: httResponse.body.message
      })
    }
  }
}
