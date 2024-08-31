export enum UserRoleEnum {
  Super = 1,
  Admin = 2,
  Employee = 3,
  User = 6
}

export enum OrderByEnum {
  DESC = 'DESC',
  ASC = 'ASC'
}

export class PaginationDto {
  readonly take?: number = 20
  readonly skip?: number = 0
  readonly order?: string = 'id'
  readonly sort?: OrderByEnum = OrderByEnum.DESC
}

export class UserFilterDto extends PaginationDto {}
