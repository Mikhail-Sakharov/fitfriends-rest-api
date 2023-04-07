import {Module} from '@nestjs/common';
import {UserRequestsController} from './user-requests.controller';
import {UserRequestsService} from './user-requests.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserRequestsModel, UserRequestsSchema} from './user-requests.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: UserRequestsModel.name, schema: UserRequestsSchema}
    ])
  ],
  controllers: [UserRequestsController],
  providers: [UserRequestsService]
})
export class UserRequestsModule {}
