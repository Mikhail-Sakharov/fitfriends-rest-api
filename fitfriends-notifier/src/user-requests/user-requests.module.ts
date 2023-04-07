import {Module} from '@nestjs/common';
import {UserRequestsController} from './user-requests.controller';
import {UserRequestsService} from './user-requests.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserRequestsModel, UserRequestsSchema} from './user-requests.model';
import {UserRequestsRepository} from './user-requests.repository';
import {JwtModule} from '@nestjs/jwt';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {name: UserRequestsModel.name, schema: UserRequestsSchema}
    ])
  ],
  controllers: [UserRequestsController],
  providers: [UserRequestsService, UserRequestsRepository, AccessTokenStrategy]
})
export class UserRequestsModule {}
