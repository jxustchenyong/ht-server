import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class GraphJwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const authorization = ctx.getContext().req.header('authorization')
    const token = this.extractTokenFromHeader(authorization)
    if (!token) {
      return false
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      ctx.getContext().req['user'] = payload
    } catch (e) {
      return false
    }
    return true
  }

  private extractTokenFromHeader(authorization: string): string | undefined {
    const [type, token] = authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
