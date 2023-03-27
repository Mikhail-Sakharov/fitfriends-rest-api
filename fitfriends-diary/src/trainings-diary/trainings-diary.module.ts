import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {TrainingsDiaryModel, TrainingsDiarySchema} from './trainings-diary.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: TrainingsDiaryModel.name, schema: TrainingsDiarySchema}
    ])
  ]
})
export class TrainingsDiaryModule {}
