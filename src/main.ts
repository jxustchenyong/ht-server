import { ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { logger } from './common/logger/logger.middleware'
import { TransformInterceptor } from './common/logger/transform.interceptor'
import { AllExceptionsFilter } from './common/filters/any-exception.filter'
import { ResponseInterceptor } from './common/response/response.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalPipes(new ValidationPipe())
  app.use(logger)
  // app.useGlobalInterceptors(new TransformInterceptor(), new ResponseInterceptor(new Reflector()))
  app.useGlobalInterceptors(new ResponseInterceptor(new Reflector()))
  // app.useGlobalFilters(new AllExceptionsFilter())
  // 设置swagger文档相关配置
  if (process.env.PROJECT_ENV == 'dev') {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('hilton api document')
      .setDescription('hilton project api document')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, swaggerOptions)
    SwaggerModule.setup('doc', app, document)
  }

  await app.listen(3000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
