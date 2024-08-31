import { Request, Response } from 'express'
import { Logger } from './log4js.core'

// 函数式中间件
export function logger(req: Request, res: Response, next: () => any) {
  const code = res.statusCode // 响应状态码
  next()
  // 组装日志信息
  const logFormat = JSON.stringify({
    IP: req.ip,
    req_url: req.originalUrl,
    req_method: req.method,
    status_code: code,
    parmas: req.params,
    query: req.query,
    body: req.body
  })
  // 根据状态码，进行日志类型区分

  if (code >= 400) {
    Logger.error(logFormat)
  } else {
    Logger.access(logFormat)
  }
}
