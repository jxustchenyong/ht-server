import { UserInfo } from '../api/user/entities/user.info.entity'
import { Reservation } from '../api/reservation/entities/reservation.entity'
import { Ability, InferSubjects } from '@casl/ability'

export enum Subject {
  User = 'user',
  Reservation = 'reservation',
  Admin = 'admin',
  All = 'all'
}

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete'
}

export const SubjectMap = new Map()
SubjectMap.set(Subject.Reservation, Reservation)
SubjectMap.set(Subject.User, UserInfo)
SubjectMap.set(Subject.All, 'all')
SubjectMap.set(Subject.Admin, 'admin')

export type Subjects = InferSubjects<typeof UserInfo | typeof Reservation> | 'all' | 'admin'

export type AppAbility = Ability<[Action, Subjects]>
