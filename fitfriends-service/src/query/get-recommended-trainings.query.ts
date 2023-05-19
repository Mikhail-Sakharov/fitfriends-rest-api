import {IsEnum, IsNumberString, IsOptional} from 'class-validator';
import {ClientSortOrder, SortType} from 'src/types/sort.types';

export class GetRecommendedTrainingsQuery {
  @IsOptional()
  @IsNumberString()
  public minCaloriesCount?: number;

  @IsOptional()
  @IsNumberString()
  public maxCaloriesCount?: number;

  @IsOptional()
  public duration?: string;

  @IsOptional()
  public trainingType?: string;

  @IsOptional()
  public trainingLevel?: string;

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
