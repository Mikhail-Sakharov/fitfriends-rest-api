import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {TrainingsDiaryModel, TrainingsDiarySchema} from './trainings-diary.model';
import {TrainingsDiaryRepository} from './trainings-diary.repository';
import { TrainingsDiaryService } from './trainings-diary.service';
import { TrainingsDiaryController } from './trainings-diary.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: TrainingsDiaryModel.name, schema: TrainingsDiarySchema}
    ])
  ],
  providers: [TrainingsDiaryRepository, TrainingsDiaryService],
  controllers: [TrainingsDiaryController]
})
export class TrainingsDiaryModule {}
