import {ArrayMaxSize, ArrayMinSize, IsEnum, IsNumber, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {GymDescriptionLength, GymPrice, GymTitleLength, GYM_FEATURES_MIN_COUNT, GYM_IMAGES_MAX_COUNT} from 'src/app.constant';
import {GymFeatures} from 'src/types/gym-features.enum';
import {SubwayStation} from 'src/types/subway-station.enum';

export class CreateGymDto {
  @IsString()
  @MinLength(GymTitleLength.MIN)
  @MaxLength(GymTitleLength.MAX)
  public title: string;

  @IsEnum(SubwayStation)
  public location: SubwayStation;

  @IsEnum(GymFeatures, {each: true})
  @ArrayMinSize(GYM_FEATURES_MIN_COUNT)
  public features: GymFeatures[];

  @ArrayMaxSize(GYM_IMAGES_MAX_COUNT)
  public images: string[];

  @IsString()
  @MaxLength(GymDescriptionLength.MAX)
  public description: string;

  @IsNumber()
  @Min(GymPrice.MIN)
  @Max(GymPrice.MAX)
  public price: number;
}
