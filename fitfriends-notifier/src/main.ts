import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';
import {getRabbitMqConfig} from './config/rabbitmq.config';
import {ConfigService} from '@nestjs/config';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice(getRabbitMqConfig(configService));
  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('The «Fitfriends-Notifier» service')
    .setDescription('Fitfriends-Notifier service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec', app, document);

  const port = process.env.PORT || 3003;
  await app.listen(port);
  Logger.log(
    `🚀 The "fitfriends-notifier" is running on: http://localhost:${port}`
  );
}
bootstrap();
