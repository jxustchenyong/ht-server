import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserInfo } from './entities/user.info.entity'
import { HttpErrorResponse } from 'src/common/filters/error'
import * as bcrypt from 'bcrypt'
import { defaultPwd, saltRounds } from 'config'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: Repository<UserInfo>
  ) {}

  async register(body, role = 6) {
    const user = await this.userInfoRepository.findOne({ where: { phone_number: body.phone_number } })
    if (user) {
      throw new HttpErrorResponse('该手机号已被注册')
    }
    return await this.userInfoRepository.save(
      this.userInfoRepository.create({
        phone_number: body.phone_number,
        password: await bcrypt.hash(body.password ? body.password : defaultPwd, saltRounds),
        name: body.name,
        role_id: role,
        nickname: body.nickname
      })
    )
  }

  // 获取单个用户权限 用于casl
  async getSelfPermission(phone_number: string) {
    const user = await this.userInfoRepository.findOne({ where: { phone_number } })
    // TODO need to set role,role permission
    const permission = {
      // 1	管理员	拥有后台全部权限
      1: [{ can: 1, subject: 'all', action: 'manage' }],

      // 2	主管	拥有后台业务模块全部权限
      2: [
        { can: 1, subject: 'user', action: 'manage' },
        { can: 1, subject: 'reservation', action: 'manage' }
      ],

      // 3	员工	拥有后台访问只读权限
      3: [
        { can: 1, subject: 'user', action: 'read' },
        { can: 1, subject: 'reservation', action: 'manage' }
      ],

      // 6	访客	拥有只读权限
      6: [
        { can: 1, subject: 'reservation', action: 'create' },
        { can: 1, subject: 'reservation', action: 'read' },
        { can: 1, subject: 'reservation', action: 'update' }
      ]
    }
    return permission[user.role_id]
  }

  async findAll(query) {
    const [items, count] = await this.userInfoRepository.findAndCount({
      order: {
        [query.order]: query.sort
      },
      take: query.take,
      skip: query.skip
    })
    return { total: count, data: items }
  }

  async findOne(phone: string) {
    return await this.userInfoRepository.findOne({ where: { phone_number: phone } })
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
