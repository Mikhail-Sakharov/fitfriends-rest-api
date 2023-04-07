import {Status} from './status.enum';
import {UserRequestType} from './user-request-type.enum';

export interface UserRequest {
  _id?: string;
  createdAt?: string;
  type: UserRequestType;
  initiatorId: string;
  userId?: string;
  statusChangeDate?: string;
  status: Status;
}
