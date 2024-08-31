import * as path from 'path'
const baseLogPath = path.resolve(__dirname, '../../logs')

const log4jsConfig = {
  appenders: {
    console: { type: 'console' },
    // 统计日志
    access: {
      type: 'dateFile',
      compress: true,
      filename: `${baseLogPath}/access/access.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyy-MM-dd',
      // maxLogSize: 10485760,  // 日志大小
      daysToKeep: 30,
      numBackups: 3,
      category: 'http',
      keepFileExt: true
    },
    // 一些app 应用日志
    app: {
      type: 'dateFile',
      compress: true,
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: "[%d{yyyy-MM-dd hh:mm:ss SSS}] [%p] -h: %h -pid: %z  msg: '%m' "
      },
      pattern: 'yyyy-MM-dd',
      daysToKeep: 30,
      numBackups: 3,
      keepFileExt: true
    },
    // 异常日志
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/error/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: "[%d{yyyy-MM-dd hh:mm:ss SSS}] [%p] -h: %h -pid: %z  msg: '%m' "
      },
      pattern: 'yyyy-MM-dd',
      daysToKeep: 30,
      numBackups: 3,
      keepFileExt: true
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile'
    }
  },
  categories: {
    default: {
      appenders: ['console', 'access', 'app', 'errors'],
      level: 'DEBUG'
    },
    mysql: { appenders: ['access', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'DEBUG' }
  }
}

export default log4jsConfig
