/**
 * Transform interceptor.
 * @file 请求流拦截器
 * @module interceptor/transform
 */

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Reflector } from '@nestjs/core'
import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common'
import * as META from '../constants/meta.constant'
import * as TEXT from '../constants/text.constant'
import * as VALUES from '../constants/values.constant'
import { TMessage } from './response.interface'
import { IPaginationResponseRaw, IPaginationResponseBase, IHttpSuccessResponse } from './response.interface'
import { StatusCode } from '../constants/code.constant'

// 转换为标准的分页数据结构
export function transformDataToPaginate<T>(
  transformData: IPaginationResponseRaw<T>,
  query: any
): IPaginationResponseBase<T> {
  // 获取 query 参数中的分页信息
  const page = !query.skip || query.skip == 0 ? VALUES.RESPONSE_PAGE : Math.ceil(query.skip / query.take) + 1
  const total = Number(transformData.total)
  const page_size = Number(query.take) ? Number(query.take) : VALUES.RESPONSE_PAGE_SIZE
  const page_total = Math.ceil(total / page_size)

  return {
    data: transformData.data,
    pagination: {
      total: total,
      page: page,
      page_size: page_size,
      page_total: page_total
    }
  }
}

/**
 * @class TransformInterceptor
 * @classdesc 当控制器所需的 Promise service 成功响应时，将在此被转换为标准的数据结构 THttpSuccessResponse
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IHttpSuccessResponse<T>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<IHttpSuccessResponse<T>> {
    const call$ = next.handle()
    const target = context.getHandler()
    if (!context.switchToHttp().getRequest()) {
      return call$.pipe((data: any) => {
        return data
      })
    }
    const query = context.switchToHttp().getRequest().query
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const message = this.reflector.get<TMessage>(META.HTTP_SUCCESS_MESSAGE, target) || TEXT.HTTP_DEFAULT_SUCCESS_TEXT
    const usePaginate = this.reflector.get<boolean>(META.HTTP_RES_TRANSFORM_PAGINATE, target)
    const useOriginal = this.reflector.get<boolean>(META.HTTP_RES_USE_ORIGINAL, target)
    if (request.method == 'POST' && response.statusCode == 201) response.statusCode = 200 // disable-status-201
    return call$.pipe(
      map((data: any) => {
        const response = { code: StatusCode.SuccessCode, msg: message }
        return usePaginate
          ? Object.assign(response, transformDataToPaginate<T>(data, query))
          : useOriginal
          ? data
          : Object.assign(response, { data: data })
      })
    )
  }
}
