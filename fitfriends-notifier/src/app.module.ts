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
import {SubscriptionModule} from './subscription/subscription.module';
import {getBullConfig, redisOptions} from './config/redis.config';
import {BullModule} from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, rabbitMqOptions, jwtOptions, mailOptions, redisOptions],
      validationSchema: envSchema
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    BullModule.forRootAsync(
      getBullConfig()
    ),
    NotificationsModule,
    UserRequestsModule,
    MailModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
