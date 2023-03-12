import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserModel, UserSchema} from './user.model';
import {UsersRepository} from './users.repository';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: UserModel.name, schema: UserSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersRepository, UsersService]
})
export class UsersModule {}
