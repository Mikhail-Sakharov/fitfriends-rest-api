import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ENV_FILE_PATH} from './app.constant';
import {MongooseModule} from '@nestjs/mongoose';
import databaseConfig, {getMongoDbConfig} from './config/database.config';
import {NotificationsModule} from './notifications/notifications.module';
import envSchema from './env.schema';
import {rabbitMqOptions} from './config/rabbitmq.config';
import {jwtOptions} from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, rabbitMqOptions, jwtOptions],
      validationSchema: envSchema
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    NotificationsModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
