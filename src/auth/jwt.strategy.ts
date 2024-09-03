import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { jwtConstants } from './constants'

export interface IPayload {
  id?: number
  phone_number: string
  name: string
  entrance?: string
  status: boolean
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload: IPayload) {
    return {
      id: payload.id,
      phone_number: payload.phone_number,
      name: payload.name,
      status: payload.status
    }
  }
}
