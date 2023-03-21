import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  
  const config = new DocumentBuilder()
    .setTitle('The «Fitfriends-Service» service')
    .setDescription('Fitfriends-Service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(
    `🚀 The "fitfriends-service" is running on: http://localhost:${port}`
  );
}
bootstrap();
