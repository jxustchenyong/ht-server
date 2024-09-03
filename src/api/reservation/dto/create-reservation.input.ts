import { InputType, Int, Field } from '@nestjs/graphql'
import { IsDateString } from 'class-validator'

@InputType()
export class CreateReservationInput {
  @Field(() => String, { description: 'Guest Name' })
  name: string

  @Field(() => String, { description: 'Guest phone_number' })
  phone_number: string

  @Field(() => String)
  contact_info

  @IsDateString()
  @Field(() => String)
  arrival_time

  @Field(() => String)
  table_size_info = 'normal'

  @Field(() => Int)
  status?: number = 0
}
