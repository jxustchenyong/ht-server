import * as os from 'os'
import { DbLogger } from '../src/common/logger/log4js.core'
import { join } from 'path'
import { ConnectionOptions } from 'typeorm'

export const hostname = os.hostname()
export const DEBUG =
  process.env.PROJECT_ENV == 'dev' ? true : os.platform() == 'win32' || os.platform() == 'darwin' ? true : false

const MYSQL_dev: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'admin123',
  database: 'hilton',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  logger: new DbLogger(),
  // synchronize: false,
  maxQueryExecutionTime: 1000,
  timezone: '+08:00'
}
const MYSQL_prod: ConnectionOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'admin123',
  database: 'hilton',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
  logger: new DbLogger(),
  synchronize: false,
  maxQueryExecutionTime: 1000,
  timezone: '+08:00'
}
const couchbase_dev = {
  clusterConnStr: 'couchbase://127.0.0.1',
  username: 'Administrator',
  password: 'admin123'
}

const couchbase_prod = {
  clusterConnStr: 'couchbase://127.0.0.1',
  username: 'Administrator',
  password: 'admin123'
}

export const db: ConnectionOptions = DEBUG ? MYSQL_dev : MYSQL_dev
export const couchbaseConfig = DEBUG ? couchbase_dev : couchbase_prod
export const defaultPwd = 'admin123'
export const saltRounds = 10
