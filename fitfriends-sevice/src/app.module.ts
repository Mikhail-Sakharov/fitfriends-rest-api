import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {ENV_FILE_PATH} from './app.constant';
import databaseConfig, {getMongoDbConfig} from './config/database.config';
import envSchema from './env.schema';
import {TrainingsModule} from './trainings/trainings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig],
      validationSchema: envSchema
    }),
    MongooseModule.forRootAsync(
      getMongoDbConfig()
    ),
    TrainingsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
