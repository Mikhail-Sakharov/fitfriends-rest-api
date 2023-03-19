import {IsEnum, IsNumberString, IsOptional} from 'class-validator';
import {Duration} from 'src/types/duration.enum';
import {ClientSortOrder, SortType} from 'src/types/sort.types';

export class GetTrainings {
  @IsNumberString()
  public minPrice?: number;

  @IsOptional()
  @IsNumberString()
  public maxPrice?: number;

  @IsOptional()
  @IsNumberString()
  public minCaloriesCount?: number;

  @IsOptional()
  @IsNumberString()
  public maxCaloriesCount?: number;

  @IsOptional()
  @IsNumberString()
  public rating?: number;

  @IsOptional()
  @IsEnum(Duration)
  public duration?: Duration;

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
