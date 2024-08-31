import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Logger } from './log4js.core'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req

    return next.handle().pipe(
      map(data => {
        const logFormat = JSON.stringify({
          IP: req.ip,
          user: req.user,
          res_url: req.originalUrl,
          res_method: req.method
        })
        Logger.access(logFormat)
        return data
      })
    )
  }
}
