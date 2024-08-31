/**
 * Code constant
 * @file 响应体: 自定义响应状态码 code
 */

// code 响应状态码
export enum StatusCode {
  SuccessCode = 0,
  ErrorCode = 1,
  CustomCode = 2
}

// http 状态码
export enum EHttpStatus {
  Success = 200,
  Error = 1002,
  VALIDATION_ERROR_CODE = 400, // 参数验证失败
  Unauthorized_ERROR_CODE = 401,
  FORBIDDEN_ERROR_CODE = 403,
  INTERNAL_SERVER_ERROR_CODE = 500,
  BAD_REQUEST
}

// 排序枚举
export enum OrderByEnum {
  DESC = 'DESC',
  ASC = 'ASC'
}
