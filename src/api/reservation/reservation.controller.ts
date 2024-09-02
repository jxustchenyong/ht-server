import { Controller, Get, Post, Body, Request, Put, Param, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { PoliciesGuard } from 'src/casl/casl.guard'
import { CheckPolicies } from 'src/casl/casl.decorator'
import { Action, AppAbility } from 'src/casl/casl.type'
import { ReservationService } from './reservation.service'
import { Reservation } from './entities/reservation.entity'
import { CreateReservationInput } from './dto/create-reservation.input'

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // 访客下单
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createReservation(@Request() req, @Body() body: CreateReservationInput) {
    body.status = 0
    return await this.reservationService.createReservation(req.user, body)
  }

  // 管理员下单
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Post('admin')
  async createReservationAdmin(@Body() body) {
    const userInfo = {
      name: body.name,
      phone_number: body.phone_number
    }
    return await this.reservationService.createReservation(userInfo, body)
  }

  // 访客更新订单
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Put('')
  async updatePersonOrder(@Request() req, @Body() body) {
    return await this.reservationService.updateReservation(req.user.phone_number, body)
  }

  // 访客取消订单
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Put('cancel')
  async cancelPersonOrder(@Request() req, @Body() body) {
    body.status = -1
    return await this.reservationService.updateReservationStatus(req.user.phone_number, body)
  }

  // 管理员更新订单
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Put('admin')
  async adminUpdateOrder(@Request() req, @Body() body) {
    return await this.reservationService.updateReservation(body.phone_number, body)
  }

  // 管理员确认、取消订单
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Put('admin/status')
  async adminConfirmOrder(@Request() req, @Body() body) {
    return await this.reservationService.updateReservationStatus(body.phone_number, body)
  }

  // 管理员查看所有
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllOrder(@Request() req, @Query() Query) {
    return await this.reservationService.getAllReservation(Query)
  }

  // 管理员查看单条信息
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Manage, Reservation))
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOrderById(@Param('id') id) {
    return await this.reservationService.getReservationById(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getPersonOrder(@Request() req) {
    return await this.reservationService.getReservationById(req.user.phone_number)
  }
}
