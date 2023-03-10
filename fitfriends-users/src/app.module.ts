import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {ENV_FILE_PATH} from './app.constant';
import {AuthModule} from './auth/auth.module';
import databaseConfig, {getMongoDbConfig} from './config/database.config';
import {UsersModule} from './users/users.module';

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
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
