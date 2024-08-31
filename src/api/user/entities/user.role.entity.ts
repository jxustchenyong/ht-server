import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user_role')
export class UserRole {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

  @Column('varchar', { name: 'name', length: 255 })
  name: string

  @Column('varchar', { name: 'description', length: 255 })
  description: string
}
