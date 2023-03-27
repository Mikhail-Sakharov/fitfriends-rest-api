import {Module} from '@nestjs/common';
import {TrainingsDiaryModule} from './trainings-diary/trainings-diary.module';
import {FoodDiaryModule} from './food-diary/food-diary.module';
import {ConfigModule} from '@nestjs/config';
import {ENV_FILE_PATH} from './app.constant';
import {MongooseModule} from '@nestjs/mongoose';
import databaseConfig, {getMongoDbConfig} from './config/database.config';

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
    TrainingsDiaryModule,
    FoodDiaryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
