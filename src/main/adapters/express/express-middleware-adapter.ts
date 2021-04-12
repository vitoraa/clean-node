import { NextFunction, Request, Response } from 'express'
import { Middleware } from '@/presentation/protocols/middleware'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers || {})
    }
    const httResponse = await middleware.handle(request)
    if (httResponse.statusCode === 200) {
      Object.assign(req, httResponse.body)
      next()
    } else {
      res.status(httResponse.statusCode).json({
        error: httResponse.body.message
      })
    }
  }
}
