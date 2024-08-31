import { Controller, Get, Post, Body, Query, Param, Delete, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PoliciesGuard } from 'src/casl/casl.guard'
import { CheckPolicies } from 'src/casl/casl.decorator'
import { Action, AppAbility } from 'src/casl/casl.type'
import { UserService } from './user.service'
import { UserInfo } from './entities/user.info.entity'
import { UserRoleEnum, UserFilterDto } from './user.dto'
import { PageSuccessResponse } from 'src/common/response/response.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body) {
    return await this.userService.register(body)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, 'all'))
  @UseGuards(AuthGuard('jwt'))
  @Post('register/admin')
  async registerAdmin(@Body() body) {
    return await this.userService.register(body, UserRoleEnum.Admin)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, UserInfo))
  @UseGuards(AuthGuard('jwt'))
  @Post('register/employee')
  async registerEmployee(@Body() body) {
    return await this.userService.register(body, UserRoleEnum.Employee)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, UserInfo))
  @UseGuards(AuthGuard('jwt'))
  @PageSuccessResponse(true)
  @Get()
  async findAll(@Query() query: UserFilterDto) {
    return this.userService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
