import {Module} from '@nestjs/common';
// import {ConfigModule} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
// import {PassportModule} from '@nestjs/passport';
import {UsersModule} from '../users/users.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {AccessTokenStrategy} from './strategies/access-token.strategy';
import {RefreshTokenStrategy} from './strategies/refresh-token.strategy';

@Module({
  imports: [
    /* ConfigModule,  */ UsersModule,
    // PassportModule,
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {}
