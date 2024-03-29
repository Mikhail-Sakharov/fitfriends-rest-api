import {Transform} from 'class-transformer';
import {IsEnum, IsNumberString, IsOptional} from 'class-validator';
import {ClientSortOrder, SortType} from 'src/types/sort.types';

export class GetUsersQuery {
  @IsOptional()
  public location?: string;

  @IsOptional()
  public trainingTypes?: string;

  @IsOptional()
  public trainingLevel?: string;

  @IsOptional()
  public userRole?: string;

  @IsOptional()
  @Transform(({obj}) => {
    switch(obj.isReadyForTraining) {
      case 'true':
        return true;
      case 'false':
        return false;
    }
  })
  public isReadyForTraining?: boolean;

  @IsOptional()
  @IsEnum(SortType)
  public sortType?: SortType;

  @IsOptional()
  @IsEnum(ClientSortOrder)
  public sortOrder?: ClientSortOrder;

  @IsOptional()
  @IsNumberString()
  public page?: number;

  @IsOptional()
  @IsNumberString()
  public limit?: number;
}
