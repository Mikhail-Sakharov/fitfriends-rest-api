import {IsEnum, IsNumberString, IsOptional} from 'class-validator';
import {ClientSortOrder, SortType} from 'src/types/sort.types';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

export class GetUsersQuery {
  @IsOptional()
  @IsEnum(SubwayStation)
  public location?: SubwayStation[];

  @IsOptional()
  @IsEnum(TrainingType)
  public trainingTypes?: TrainingType[];

  @IsOptional()
  @IsEnum(TrainingLevel)
  public trainingLevel: TrainingLevel;

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
