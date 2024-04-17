import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MyLogger } from './logger/mylogger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: new MyLogger(),
  });
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.enableCors();
  await app.listen(3001);
  console.log(`[bootstrap] server is running on port: 3001`)
}
bootstrap();
