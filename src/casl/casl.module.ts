import { forwardRef, Module } from '@nestjs/common'
import { CaslAbilityFactory } from './casl-ability.factory'
import { UserModule } from '../api/user/user.module'

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class CaslModule {}
