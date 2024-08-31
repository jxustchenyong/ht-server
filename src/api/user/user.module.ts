import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CaslModule } from 'src/casl/casl.module'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserInfo } from './entities/user.info.entity'
import { UserRole } from './entities/user.role.entity'

@Module({
  imports: [forwardRef(() => CaslModule), TypeOrmModule.forFeature([UserInfo, UserRole])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
