import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';
import {TrainingModel, TrainingSchema} from './training.model';
import {TrainingsController} from './trainings.controller';
import {TrainingRepository} from './trainings.repository';
import {TrainingsService} from './trainings.service';
import {ClientsModule} from '@nestjs/microservices';
import {RABBITMQ_SERVICE} from 'src/app.constant';
import {getRabbitMqConfig} from 'src/config/rabbitmq.config';
import {ConfigService} from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {name: TrainingModel.name, schema: TrainingSchema}
    ]),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [TrainingsController],
  providers: [TrainingsService, TrainingRepository, AccessTokenStrategy],
  exports: [TrainingsService]
})
export class TrainingsModule {}
