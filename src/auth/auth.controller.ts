import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PoliciesGuard } from 'src/casl/casl.guard'
import { CheckPolicies } from 'src/casl/casl.decorator'
import { Action, AppAbility, Subject } from 'src/casl/casl.type'
import { AuthService } from './auth.service'
import { Reservation } from 'src/api/reservation/entities/reservation.entity'
import { UserInfo } from '../api/user/entities/user.info.entity'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录测试
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
  // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user
  }

  // 测试登录后权限casl
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Get('casl')
  getPermission(@Request() req) {
    return req.user
  }
}
