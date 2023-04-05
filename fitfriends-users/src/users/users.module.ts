import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModel, UserSchema} from './user.model';
import {UsersRepository} from './users.repository';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {JwtModule} from '@nestjs/jwt';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';
import {RefreshTokenStrategy} from 'src/strategies/refresh-token.strategy';
import {ClientsModule} from '@nestjs/microservices';
import {RABBITMQ_SERVICE} from 'src/app.constant';
import {getRabbitMqConfig} from 'src/config/rabbitmq.config';
import {ConfigService} from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{name: UserModel.name, schema: UserSchema}]),
    JwtModule.register({}),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [UsersRepository, UsersService]
})
export class UsersModule {}
