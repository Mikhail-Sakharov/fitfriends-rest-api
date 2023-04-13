import {IsBoolean, IsEnum, IsNumberString, IsOptional} from 'class-validator';
import {ClientSortOrder, SortType} from 'src/types/sort.types';

export class GetGymsQuery {
  @IsOptional()
  @IsNumberString()
  public minPrice?: number;

  @IsOptional()
  @IsNumberString()
  public maxPrice?: number;

  @IsOptional()
  public location?: string;

  @IsOptional()
  public features?: string;

  @IsOptional()
  @IsBoolean()
  public isVerified?: boolean;

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
