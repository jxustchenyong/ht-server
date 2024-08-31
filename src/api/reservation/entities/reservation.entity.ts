import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Reservation {
  @Field(() => String, { description: 'Guest Name' })
  name: string

  @Field(() => String, { description: 'Guest contact Info' })
  contact_info

  @Field(() => String, { description: 'Expected arrival time' })
  arrival_time

  @Field(() => String, { description: 'Reserved table size info' })
  table_size_info

  @Field(() => Int, { description: 'Status of the reservation' })
  status: number
}
