import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModel, UserSchema} from './user.model';
import {UsersRepository} from './users.repository';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {JwtModule} from '@nestjs/jwt';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';
import {RefreshTokenStrategy} from 'src/strategies/refresh-token.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{name: UserModel.name, schema: UserSchema}]),
    JwtModule.register({})
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [UsersRepository, UsersService]
})
export class UsersModule {}
