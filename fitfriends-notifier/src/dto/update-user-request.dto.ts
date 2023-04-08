import {IsEnum, IsOptional} from 'class-validator';
import {Status} from 'src/types/status.enum';

export class UpdateUserRequestDto {
  @IsOptional()
  @IsEnum(Status)
  public status: Status;
}
