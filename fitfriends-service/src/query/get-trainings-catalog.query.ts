import {IsEnum, IsNumberString, IsOptional} from 'class-validator';
import {ClientSortOrder, SortType} from 'src/types/sort.types';

export class GetTrainingsCatalog {
  @IsOptional()
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
