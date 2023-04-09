import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ENV_FILE_PATH} from './app.constant';
import {MongooseModule} from '@nestjs/mongoose';
import databaseConfig, {getMongoDbConfig} from './config/database.config';
import {NotificationsModule} from './notifications/notifications.module';
import envSchema from './env.schema';
import {rabbitMqOptions} from './config/rabbitmq.config';
import {jwtOptions} from './config/jwt.config';
import {UserRequestsModule} from './user-requests/user-requests.module';
import {MailModule} from './mail/mail.module';
import {mailOptions} from './config/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, rabbitMqOptions, jwtOptions, mailOptions],
      validationSchema: envSchema
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    NotificationsModule,
    UserRequestsModule,
    MailModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
