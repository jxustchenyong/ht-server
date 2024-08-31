import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../api/user/user.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(phone_number: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(phone_number)
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any): Promise<any> {
    const payload = { phone_number: user.phone_number, id: user.id, status: user.status }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
