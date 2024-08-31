import { Injectable } from '@nestjs/common'
import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability'
import { UserInfo } from '../api/user/entities/user.info.entity'
import { UserService } from '../api/user/user.service'
import { Action, AppAbility, SubjectMap, Subjects } from './casl.type'

@Injectable()
export class CaslAbilityFactory {
  constructor(private userService: UserService) {}
  async createForUser(user: UserInfo) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(Ability as AbilityClass<AppAbility>)
    // 获取权限列表
    const permission = await this.userService.getSelfPermission(user.phone_number)
    //映射权限
    permission
      // .filter(item => !item.condition)
      .map(item =>
        item.can ? can(item.action, SubjectMap.get(item.subject)) : cannot(item.action, SubjectMap.get(item.subject))
      )
    // 构建权限
    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    })
  }
}
