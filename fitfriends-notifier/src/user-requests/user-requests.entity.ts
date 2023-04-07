import {Entity} from 'src/types/entity.interface';
import {Status} from 'src/types/status.enum';
import {UserRequestType} from 'src/types/user-request-type.enum';
import {UserRequest} from 'src/types/user-request.interface';

export class UserRequestsEntity implements UserRequest, Entity<UserRequest> {
  public type: UserRequestType;
  public initiatorId: string;
  public userId: string;
  public statusChangeDate?: string;
  public status: Status;

  constructor(userRequest: UserRequest) {
    this.fillEntity(userRequest);
  }

  toObject(): UserRequest {
    return {...this};
  }
  fillEntity(userRequest: UserRequest) {
    this.type = userRequest.type;
    this.initiatorId = userRequest.initiatorId;
    this.userId = userRequest.userId;
    this.statusChangeDate = userRequest.statusChangeDate;
    this.status = userRequest.status;
  }
}
