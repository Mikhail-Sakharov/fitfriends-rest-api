import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Status} from 'src/types/status.enum';
import {UserRequestType} from 'src/types/user-request-type.enum';
import {UserRequest} from 'src/types/user-request.interface';

@Schema({
  collection: 'fitfriends-user-requests',
  timestamps: true
})
export class UserRequestsModel extends Document implements UserRequest {
  @Prop({
    requred: true
  })
  public type: UserRequestType;

  @Prop({
    requred: true
  })
  public initiatorId: string;

  @Prop({
    requred: true
  })
  public userId: string;

  @Prop({
    default: Status.Pending
  })
  public status: Status;
}

export const UserRequestsSchema = SchemaFactory.createForClass(UserRequestsModel);
