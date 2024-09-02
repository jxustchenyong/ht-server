import { Injectable, OnModuleInit } from '@nestjs/common'
import { CreateReservationInput } from './dto/create-reservation.input'
import { UpdateReservationInput } from './dto/update-reservation.input'
import { CouchBaseAdapterService } from 'src/couchbase/couch-base-adapter.service'
import { Bucket, Cluster, Collection, QueryResult } from 'couchbase'
import * as dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class ReservationService implements OnModuleInit {
  constructor(private couchBaseService: CouchBaseAdapterService) {}

  private collection: Collection
  private cluster: Cluster
  private bucket: Bucket

  async onModuleInit(): Promise<void> {
    this.cluster = await this.couchBaseService.connectDb()
    this.bucket = this.cluster.bucket('reservation')
    this.collection = this.bucket.scope('_default').collection('_default')
  }

  async createReservation(user, input: CreateReservationInput) {
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const resInfo = {
      name: user.name,
      phone_number: user.phone_number,
      contact_info: input.contact_info,
      arrival_time: input.arrival_time,
      table_size_info: input.table_size_info,
      status: input.status,
      create_time: now,
      update_time: now
    }
    let guid = uuidv4()
    const reservation = await this.collection.upsert(guid, resInfo)
    return reservation
  }

  async updateReservation(phone_number: string, body) {
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const ori = await this.collection.get(body.id)
    const value = {
      contact_info: body.contact_info,
      table_size_info: body.table_size_info,
      arrival_time: body.arrival_time,
      update_time: now
    }
    const reservation = await this.collection.replace(body.id, Object.assign(ori.content, value))
    return reservation
  }

  async updateReservationStatus(phone_number: string, body) {
    const ori = await this.collection.get(body.id)
    const value = {
      status: body.status
    }
    const reservation = await this.collection.replace(body.id, Object.assign(ori.content, value))
    return reservation
  }

  async getAllReservation(filter) {
    let q = 'SELECT * FROM `_default` order by create_time desc'
    if (filter.limit > 0) {
      q += ` limit ${filter.limit}`
    }
    if (filter.offset > 0) {
      q += ` offset ${filter.offset}`
    }
    const reservation = await this.bucket.scope('_default').query(q)
    return reservation.rows
  }

  async getReservationById(id: string) {
    const reservation = await this.collection.get(id)
    return reservation
  }

  update(name: string, updateReservationInput: UpdateReservationInput) {
    return `This action updates a #${name} reservation`
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`
  }
}
