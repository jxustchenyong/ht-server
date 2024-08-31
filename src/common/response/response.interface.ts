/**
 * HTTP interface.
 * @file HTTP 响应接口模型
 */

import { StatusCode } from '../constants/code.constant'

// 响应体: 响应信息 msg
export type TMessage = string

// 响应体: 共同的 code与msg
export interface IHttpResponseBase {
  code: StatusCode
  msg: TMessage
}

// 分页响应体构造: 分页路由的入参格式校验
export interface IPaginationResponseRaw<T> {
  total: number
  data: T // 数据列
}

// 响应体: 分页路由的响应体校验
export interface IPaginationResponseBase<T> {
  data: T
  // 响应体: 分页信息数据
  pagination?: {
    total: number // 总数据量
    page: number // 当前页码
    page_size: number // 每页大小
    page_total: number // 总页数
  }
}

// 响应体: 完整返回体
export interface IHttpSuccessResponse<T> extends IHttpResponseBase, IPaginationResponseBase<T> {}
