import {Module} from '@nestjs/common';
import {UserRequestsController} from './user-requests.controller';
import {UserRequestsService} from './user-requests.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserRequestsModel, UserRequestsSchema} from './user-requests.model';
import {UserRequestsRepository} from './user-requests.repository';
import {JwtModule} from '@nestjs/jwt';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';
import {ClientsModule} from '@nestjs/microservices';
import {RABBITMQ_SERVICE} from 'src/app.constant';
import {getNotifierServiceRabbitMqConfig} from 'src/config/rabbitmq.config';
import {ConfigService} from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {name: UserRequestsModel.name, schema: UserRequestsSchema}
    ]),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getNotifierServiceRabbitMqConfig,
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [UserRequestsController],
  providers: [UserRequestsService, UserRequestsRepository, AccessTokenStrategy]
})
export class UserRequestsModule {}
