import { Module } from '@nestjs/common'
import { ReservationService } from './reservation.service'
import { ReservationResolver } from './reservation.resolver'
import { CouchBaseAdapterModule } from 'src/couchbase/couch-base-adapter.module'
import { JwtModule } from '@nestjs/jwt'
import { CaslModule } from 'src/casl/casl.module'
import { ReservationController } from './reservation.controller'

@Module({
  imports: [CaslModule, JwtModule, CouchBaseAdapterModule],
  controllers: [ReservationController],
  providers: [ReservationResolver, ReservationService]
})
export class ReservationModule {}
