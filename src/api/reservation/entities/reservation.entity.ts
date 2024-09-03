import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Reservation {
  @Field(() => String, { description: 'Guest Name' })
  name: string

  @Field(() => String, { description: 'Guest Phone number' })
  phone_number: string

  @Field(() => String, { description: 'Guest contact Info' })
  contact_info

  @Field(() => Date, { description: 'Expected arrival time' })
  arrival_time

  @Field(() => String, { description: 'Reserved table size info' })
  table_size_info

  @Field(() => Int, { description: 'Status of the reservation' })
  status: number

  @Field(() => Date)
  create_time

  @Field(() => Date)
  update_time
}
