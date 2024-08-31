import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateReservationInput {
  // @Field(() => String, { description: 'Guest Name' })
  // name: string

  @Field(() => String)
  contact_info

  @Field(() => String)
  arrival_time

  @Field(() => String)
  table_size_info = 'normal'

  @Field(() => Int)
  status: number = 0
}
