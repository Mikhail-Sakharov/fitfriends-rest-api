import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';
import {TrainingModel, TrainingSchema} from './training.model';
import {TrainingsController} from './trainings.controller';
import {TrainingRepository} from './trainings.repository';
import {TrainingsService} from './trainings.service';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {name: TrainingModel.name, schema: TrainingSchema}
    ])
  ],
  controllers: [TrainingsController],
  providers: [TrainingsService, TrainingRepository, AccessTokenStrategy],
  exports: [TrainingsService]
})
export class TrainingsModule {}
