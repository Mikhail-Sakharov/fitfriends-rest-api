import {MinLength, MaxLength, IsEnum, IsNumber, IsInt, Min, Max, IsString, Matches, IsBoolean} from 'class-validator';
import {TrainingTitleLength, PRICE_DEFAULT_VALUE, TrainingCaloriesCount, TrainingDescriptionLength, VIDEO_URL_REG_EXP} from 'src/app.constant';
import {Duration} from 'src/types/duration.enum';
import {TrainingGenderType} from 'src/types/training-gender.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

export default class UpdateTrainingDto {
  @MinLength(TrainingTitleLength.MIN)
  @MaxLength(TrainingTitleLength.MAX)
  public title?: string;

  @IsEnum(TrainingLevel)
  public level?: TrainingLevel;

  @IsEnum(TrainingType)
  public type?: TrainingType;

  @IsEnum(Duration)
  public duration?: Duration;

  @IsNumber()
  @IsInt()
  @Min(PRICE_DEFAULT_VALUE)
  public price?: number;

  @Min(TrainingCaloriesCount.MIN)
  @Max(TrainingCaloriesCount.MAX)
  public caloriesCount?: number;

  @MinLength(TrainingDescriptionLength.MIN)
  @MaxLength(TrainingDescriptionLength.MAX)
  public description?: string;

  @IsEnum(TrainingGenderType)
  public gender?: TrainingGenderType;

  @IsString()
  @Matches(VIDEO_URL_REG_EXP)
  public videoUrl?: string;

  @IsBoolean()
  public isSpecialOffer?: boolean;
}
