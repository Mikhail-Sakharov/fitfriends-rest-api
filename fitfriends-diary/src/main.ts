import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  const port = process.env.PORT || 3002;
  await app.listen(port);
  Logger.log(
    `🚀 The "fitfriends-diary" is running on: http://localhost:${port}`
  );
}
bootstrap();
