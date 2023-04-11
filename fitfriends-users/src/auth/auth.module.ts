import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {UsersModule} from '../users/users.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {AccessTokenStrategy} from '../strategies/access-token.strategy';
import {RefreshTokenStrategy} from '../strategies/refresh-token.strategy';
import {ClientsModule} from '@nestjs/microservices';
import {RABBITMQ_SERVICE} from 'src/app.constant';
import {getRabbitMqConfig} from 'src/config/rabbitmq.config';
import {ConfigService} from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({}),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {}
