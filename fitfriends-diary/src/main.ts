import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  const config = new DocumentBuilder()
    .setTitle('The «Fitfriends-Diary» service')
    .setDescription('Fitfriends-Diary API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const port = process.env.PORT || 3002;
  await app.listen(port);
  Logger.log(
    `🚀 The "fitfriends-diary" is running on: http://localhost:${port}`
  );
}
bootstrap();
