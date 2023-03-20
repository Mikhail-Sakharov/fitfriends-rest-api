import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {MulterModule} from '@nestjs/platform-express';
import {ENV_FILE_PATH} from './app.constant';
import databaseConfig, {getMongoDbConfig} from './config/database.config';
import {jwtOptions} from './config/jwt.config';
import multerConfig from './config/multer.config';
import envSchema from './env.schema';
import {TrainingsModule} from './trainings/trainings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtOptions, multerConfig],
      validationSchema: envSchema
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('multer.uploadDirectory')
      }),
      inject: [ConfigService]
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
