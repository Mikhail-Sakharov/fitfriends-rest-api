import {Expose, Transform} from 'class-transformer';
import {Status} from 'src/types/status.enum';
import {UserRequestType} from 'src/types/user-request-type.enum';

export class UserRequestRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public updatedAt: string;

  @Expose()
  public type: UserRequestType;

  @Expose()
  public initiatorId: string;

  @Expose()
  public userId: string;

  @Expose()
  public statusChangeDate: string;

  @Expose()
  public status: Status;
}
