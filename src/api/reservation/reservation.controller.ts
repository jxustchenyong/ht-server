import { Controller, Get, Post, Body, Request, Put, Param, Delete, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PoliciesGuard } from 'src/casl/casl.guard'
import { CheckPolicies } from 'src/casl/casl.decorator'
import { Action, AppAbility } from 'src/casl/casl.type'
import { ReservationService } from './reservation.service'
import { Reservation } from './entities/reservation.entity'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // 访客下单
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createReservation(@Request() req, @Body() body) {
    return await this.reservationService.createReservation(req.user.phone_number, body)
  }

  // 管理员下单
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Post('admin')
  async createReservationAdmin(@Body() body) {
    return await this.reservationService.createReservation(body.phone_number, body)
  }

  // 访客更新订单
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Put('')
  async updatePersonOrder(@Request() req, @Body() body) {
    return await this.reservationService.updateReservation(req.user.phone_number, body)
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllOrder(@Request() req, @Body() body) {
    return await this.reservationService.findAll()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getPersonOrder(@Request() req) {
    return await this.reservationService.findOne(req.user.phone_number)
  }
}
