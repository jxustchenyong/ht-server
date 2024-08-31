import { Column, Entity, Index } from 'typeorm'

@Index('idx_userinfo_1', ['email'], {})
@Entity('user_info')
export class UserInfo {
  @Column('bigint', { primary: true, name: 'phone_number' })
  phone_number: string

  @Column('varchar', { name: 'password', length: 255 })
  password: string

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('varchar', { name: 'nickname', length: 255 })
  nickname: string

  @Column('varchar', { name: 'avatar', length: 255 })
  avatar: string

  @Column('varchar', { name: 'email', length: 255 })
  email: string

  @Column('int', { name: 'role_id', nullable: true, default: () => "'6'" })
  role_id: number | null
}
