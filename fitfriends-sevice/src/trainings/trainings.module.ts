import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {TrainingModel, TrainingSchema} from './training.model';
import {TrainingsController} from './trainings.controller';
import {TrainingsService} from './trainings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: TrainingModel.name, schema: TrainingSchema}
    ])
  ],
  controllers: [TrainingsController],
  providers: [TrainingsService]
})
export class TrainingsModule {}
