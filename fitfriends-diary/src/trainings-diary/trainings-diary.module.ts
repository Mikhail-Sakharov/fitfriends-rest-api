import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {TrainingsDiaryModel, TrainingsDiarySchema} from './trainings-diary.model';
import {TrainingsDiaryRepository} from './trainings-diary.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: TrainingsDiaryModel.name, schema: TrainingsDiarySchema}
    ])
  ],
  providers: [TrainingsDiaryRepository]
})
export class TrainingsDiaryModule {}
