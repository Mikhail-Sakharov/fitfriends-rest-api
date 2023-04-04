import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  const port = process.env.PORT || 3003;
  await app.listen(port);
  Logger.log(
    `🚀 The "fitfriends-notifier" is running on: http://localhost:${port}`
  );
}
bootstrap();
