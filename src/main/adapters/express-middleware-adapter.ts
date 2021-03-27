import { NextFunction, Request, Response } from 'express'
import { HttpRequest } from '../../presentation/protocols'
import { Middleware } from '../../presentation/protocols/middleware'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httResponse = await middleware.handle(httpRequest)
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
