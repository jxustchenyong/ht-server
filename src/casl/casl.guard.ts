import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CaslAbilityFactory } from './casl-ability.factory'
import { CHECK_POLICIES_KEY, PolicyHandler } from './casl.decorator'
import { AppAbility } from './casl.type'

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || []

    const { user } = context.switchToHttp().getRequest()
    const ability: AppAbility = await this.caslAbilityFactory.createForUser(user)
    return policyHandlers.every(handler => handler(ability))
  }
}
