import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'phone_number',
      passwordField: 'password'
    })
  }

  async validate(phone_number: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(phone_number, password)
    if (!user) {
      throw new HttpException(
        { message: 'authorized failed', error: 'please try again later.' },
        HttpStatus.BAD_REQUEST
      )
    }
    return user
  }
}
