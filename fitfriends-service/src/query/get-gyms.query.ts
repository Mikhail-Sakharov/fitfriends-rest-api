import {IsBoolean, IsEnum, IsNumberString, IsOptional} from 'class-validator';
import {GymFeatures} from 'src/types/gym-features.enum';
import {ClientSortOrder, SortType} from 'src/types/sort.types';
import {SubwayStation} from 'src/types/subway-station.enum';

export class GetGymsQuery {
  @IsOptional()
  @IsNumberString()
  public minPrice?: number;

  @IsOptional()
  @IsNumberString()
  public maxPrice?: number;

  @IsOptional()
  @IsEnum(SubwayStation)
  public location?: SubwayStation[];

  @IsOptional()
  @IsEnum(GymFeatures)
  public features?: GymFeatures[];

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
