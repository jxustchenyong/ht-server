/**
 * Http decorator.
 * @file 响应解析装饰器
 * @module decorator/http
 */
import { SetMetadata } from '@nestjs/common'
import { TMessage } from './response.interface'
import * as META from '../constants/meta.constant'
import * as TEXT from '../constants/text.constant'

// 构造器参数
interface IBuildDecoratorOption {
  successMessage?: TMessage
  usePaginate?: boolean
  useOriginal?: boolean
}

// 构造请求装饰器
const buildHttpDecorator = (options: IBuildDecoratorOption): MethodDecorator => {
  const { successMessage, usePaginate, useOriginal } = options
  return (_, __, descriptor: PropertyDescriptor) => {
    if (successMessage) {
      SetMetadata(META.HTTP_SUCCESS_MESSAGE, successMessage)(descriptor.value)
    }
    if (usePaginate) {
      SetMetadata(META.HTTP_RES_TRANSFORM_PAGINATE, true)(descriptor.value)
    }
    if (useOriginal) {
      SetMetadata(META.HTTP_RES_USE_ORIGINAL, true)(descriptor.value)
    }
    return descriptor
  }
}

/**
 * 统配构造器
 * @function PageSuccessResponse
 * @description 两种用法
 * @example @PageSuccessResponse(true) // 使用分页响应, 会自动计算分页值返回, 后端service需返回格式: {data: [obj], count: number}
 * @example @PageSuccessResponse(isPage: true, msg: 'xxx操作')  // 使用分页功能, 且可自定义返回信息(msg)
 */
export const PageSuccessResponse = (isPage = false, msg = '操作'): MethodDecorator => {
  const successMessage: TMessage = msg + TEXT.HTTP_SUCCESS_SUFFIX
  return buildHttpDecorator({
    successMessage: successMessage,
    usePaginate: isPage
  })
}

export const OriginalResponse = (isOriginal = false): MethodDecorator => {
  return buildHttpDecorator({
    useOriginal: isOriginal
  })
}
