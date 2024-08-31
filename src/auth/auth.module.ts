import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { CaslModule } from 'src/casl/casl.module'
import { UserModule } from '../api/user/user.module'
import { AuthController } from './auth.controller'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { jwtConstants } from './constants'

@Module({
  imports: [
    UserModule,
    PassportModule,
    CaslModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10 days' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
