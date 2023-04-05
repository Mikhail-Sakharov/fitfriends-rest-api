import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ENV_FILE_PATH} from './app.constant';
import {MongooseModule} from '@nestjs/mongoose';
import databaseConfig, {getMongoDbConfig} from './config/database.config';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig]
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