/**
 * 定义全局异常
 * 由此注入指定的http异常
 * 由any-exception.filter 进行全局捕获返回异常信息
 * 异常信息返回格式: { data?: 返回数据, errorMsg: 返回给前端的异常信息, errorCode?: 返回给前端的异常code, errorInfo?: 捕获的异常记录日志 }, http_status: http状态码
 **/
import { HttpException, UnauthorizedException } from '@nestjs/common'
import * as TEXT from '../constants/text.constant'
import * as CODE from '../constants/code.constant'

/**
 * @class HttpErrorResponse
 * @classdesc 200, 请求正常, 程序内手动抛出的异常
 * @example new HttpErrorResponse('错误信息')
 * @example  程序内异常响应处理, 状态码统一为 200
 */
export class HttpErrorResponse extends HttpException {
  constructor(errorMsg: any = TEXT.INTERNAL_SERVER_ERROR_TEXT, errInfo?: Error) {
    super({ errorMsg: errorMsg, errorInfo: errInfo }, CODE.EHttpStatus.Success)
  }
}

/**
 * @class ValidationError
 * @classdesc 400 -> 请求有问题，这个错误经常发生在错误内层
 * @example new ValidationError('错误信息')
 * @example new ValidationError(new Error())
 */
export class HttpValidationError extends HttpException {
  constructor(errorData?: any) {
    super({ data: errorData, errorMsg: TEXT.VALIDATION_ERROR_TEXT }, CODE.EHttpStatus.VALIDATION_ERROR_CODE)
  }
}

/**
 * @class HttpForbiddenError
 * @classdesc 403 -> 无权限/权限不足
 * @example new HttpForbiddenError('错误信息')
 * @example new HttpForbiddenError(new Error())
 */
export class HttpForbiddenError extends HttpException {
  constructor(error?: any) {
    super(error || TEXT.HTTP_FORBIDDEN_ERROR_TEXT, CODE.EHttpStatus.FORBIDDEN_ERROR_CODE)
  }
}

/**
 * @class HttpUnauthorizedError
 * @classdesc 401 -> 未授权/权限验证失败
 * @example new HttpUnauthorizedError('权限验证失败')
 * @example new HttpUnauthorizedError('错误信息', new Error())
 */
export class HttpUnauthorizedError extends UnauthorizedException {
  constructor(message?: string, error?: any) {
    super(message || TEXT.HTTP_UNAUTHORIZED_ERROR_TEXT, error || CODE.EHttpStatus.Unauthorized_ERROR_CODE)
  }
}

/**
 * @class HttpUnauthorizedResult
 * @classdesc 401 -> 权限验证失败, 但会返回默认数据. 自定义返回信息: data, msg
 * @example new HttpUnauthorizedResult(data, "权限验证失败")
 */
export class HttpUnauthorizedResult extends HttpException {
  constructor(data?: any, msg: string = TEXT.HTTP_UNAUTHORIZED_ERROR_TEXT) {
    super(
      { data: data, errorMsg: msg, errorCode: CODE.StatusCode.CustomCode },
      CODE.EHttpStatus.Unauthorized_ERROR_CODE
    )
  }
}
