import { Injectable } from '@nestjs/common'
import { Bucket, Cluster, Collection } from 'couchbase'
import * as couchbase from 'couchbase'
import { couchbaseConfig } from 'config'

@Injectable()
export class CouchBaseAdapterService {
  private collection: Collection

  async connectDb(): Promise<Cluster> {
    try {
      const cluster = await couchbase.connect(couchbaseConfig.clusterConnStr, {
        username: couchbaseConfig.username,
        password: couchbaseConfig.password
      })

      return cluster
    } catch (e) {
      return e
    }
  }
}
