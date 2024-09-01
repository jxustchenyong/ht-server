import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { ReservationService } from './reservation.service'
import { Reservation } from './entities/reservation.entity'
import { CreateReservationInput } from './dto/create-reservation.input'
import { UpdateReservationInput } from './dto/update-reservation.input'
import { UseGuards } from '@nestjs/common'
import { GraphJwtAuthGuard } from '../../auth/jwt-auth.guard'

@Resolver(() => Reservation)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(GraphJwtAuthGuard)
  @Mutation(() => Reservation)
  async createReservation(@Args('createReservationInput') input: CreateReservationInput) {
    return await this.reservationService.createReservation('13162203102', input)
  }

  @Query(() => [Reservation], { name: 'reservation' })
  async findAll(@Args('createReservationInput') filter: CreateReservationInput) {
    return await this.reservationService.getAllReservation(filter)
  }

  @Query(() => Reservation, { name: 'reservation' })
  async findOne(@Args('name', { type: () => String }) name: string) {
    return await this.reservationService.getReservationById(name)
  }

  @Mutation(() => Reservation)
  updateReservation(@Args('updateReservationInput') updateReservationInput: UpdateReservationInput) {
    return this.reservationService.update(updateReservationInput.name, updateReservationInput)
  }

  @Mutation(() => Reservation)
  removeReservation(@Args('id', { type: () => Int }) id: number) {
    return this.reservationService.remove(id)
  }
}
