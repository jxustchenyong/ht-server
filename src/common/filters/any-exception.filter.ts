/**
 * any-exception filter.
 * @file 全局异常捕获
 * 全局范围的异常捕获, 统一处理, 并输出error日志
 * 原则上error信息要全部记录, 可以有选择的提取信息进行前置
 */

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Logger } from '../logger/log4js.core'
import * as TEXT from '../constants/text.constant'
import * as CODE from '../constants/code.constant'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest()
    const response = host.switchToHttp().getResponse()
    const status =
      exception instanceof HttpException ? exception.getStatus() : CODE.EHttpStatus.INTERNAL_SERVER_ERROR_CODE

    // 自定义的异常信息结构, 响应用
    const error_info = exception.response ? exception.response : exception
    const error_data = exception.response?.data ? exception.response.data : {}
    const error_msg = exception.response
      ? exception.response.message
        ? exception.response.message
        : exception.response.errorMsg
      : TEXT.INTERNAL_SERVER_ERROR_TEXT
    const error_code = exception.response?.errorCode ? exception.response.errorCode : CODE.StatusCode.ErrorCode

    // 自定义异常结构体, 日志用
    const data = {
      timestamp: new Date().toISOString(),
      ip: request.ip,
      req_url: request.originalUrl,
      req_method: request.method,
      http_code: status,
      params: request.params,
      query: request.query,
      body: request.body,
      errorData: error_data,
      errorMsg: error_msg,
      errorCode: error_code,
      error_info: error_info
    }

    // 404 异常响应
    if (status === HttpStatus.NOT_FOUND) {
      data.errorMsg = `资源不存在! 接口 ${request.method} -> ${request.url} 无效!`
    }
    Logger.error(data)

    // 程序内异常捕获返回
    response.status(status).json({
      data: data.errorData,
      msg: data.errorMsg,
      code: data.errorCode
    })
  }
}
