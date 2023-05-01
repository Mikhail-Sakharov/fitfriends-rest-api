import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {MulterModule} from '@nestjs/platform-express';
import {ENV_FILE_PATH} from './app.constant';
import {AuthModule} from './auth/auth.module';
import databaseConfig, {getMongoDbConfig} from './config/database.config';
import {jwtOptions} from './config/jwt.config';
import multerConfig from './config/multer.config';
import envSchema from './env.schema';
import {UsersModule} from './users/users.module';
import {rabbitMqOptions} from './config/rabbitmq.config';
import {join} from 'path';
import {ServeStaticModule} from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtOptions, multerConfig, rabbitMqOptions],
      validationSchema: envSchema
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('multer.uploadDirectory')
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../'),
      renderPath: '/files'
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
