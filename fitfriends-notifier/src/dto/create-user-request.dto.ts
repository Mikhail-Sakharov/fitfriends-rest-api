import {IsEnum, IsMongoId, IsOptional} from 'class-validator';
import {Status} from 'src/types/status.enum';
import {UserRequestType} from 'src/types/user-request-type.enum';

export class CreateUserRequestDto {
  @IsEnum(UserRequestType)
  public type: UserRequestType;

  @IsMongoId()
  public userId: string;

  @IsOptional()
  @IsEnum(Status)
  public status: Status;
}
