import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from 'src/auth/auth.module'
import { CaslModule } from 'src/casl/casl.module'
import { DirectiveLocation, GraphQLDirective } from 'graphql'
import { upperDirectiveTransformer } from './common/directives/upper-case.directive'
import { RecipesModule } from './recipes/recipes.module'
import { ReservationModule } from './api/reservation/reservation.module'
import { CouchBaseAdapterModule } from './couchbase/couch-base-adapter.module'
import { UserModule } from './api/user/user.module'
import * as config from 'config'

@Module({
  imports: [
    CouchBaseAdapterModule,
    RecipesModule,
    TypeOrmModule.forRoot(config.db),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION]
          })
        ]
      }
    }),
    ReservationModule,
    AuthModule,
    CaslModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
