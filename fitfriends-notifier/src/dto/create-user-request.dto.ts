import {Status} from 'src/types/status.enum';
import {UserRequestType} from 'src/types/user-request-type.enum';

export class CreateUserRequestDto {
  public type: UserRequestType;
  public initiatorId: string;
  public status: Status;
}
