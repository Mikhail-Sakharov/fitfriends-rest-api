import {MinLength, MaxLength, IsEnum, IsString, Matches, IsOptional, IsBoolean, IsMongoId, IsNumber, Min, IsInt, Max} from 'class-validator';
import {TrainingTitleLength, TrainingCaloriesCount, TrainingDescriptionLength, BG_IMAGE_URL_REG_EXP, VIDEO_URL_REG_EXP, PRICE_DEFAULT_VALUE, RATING_DEFAULT_VALUE} from 'src/app.constant';
import {Duration} from 'src/types/duration.enum';
import {TrainingGenderType} from 'src/types/training-gender.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

export default class CreateTrainingDto {
  @MinLength(TrainingTitleLength.MIN)
  @MaxLength(TrainingTitleLength.MAX)
  public title!: string;

  @IsString()
  @Matches(BG_IMAGE_URL_REG_EXP)
  public bgImageUrl!: string;

  @IsEnum(TrainingLevel)
  public level!: TrainingLevel;

  @IsEnum(TrainingType)
  public type!: TrainingType;

  @IsEnum(Duration)
  public duration!: Duration;

  @IsNumber()
  @IsInt()
  @Min(PRICE_DEFAULT_VALUE)
  public price?: number;

  @Min(TrainingCaloriesCount.MIN)
  @Max(TrainingCaloriesCount.MAX)
  public caloriesCount!: number;

  @MinLength(TrainingDescriptionLength.MIN)
  @MaxLength(TrainingDescriptionLength.MAX)
  public description!: string;

  @IsEnum(TrainingGenderType)
  public gender!: TrainingGenderType;

  @IsString()
  @Matches(VIDEO_URL_REG_EXP)
  public videoUrl!: string;

  @IsOptional()
  @IsNumber()
  @Min(RATING_DEFAULT_VALUE)
  public rating?: number;

  @IsMongoId()
  public coachId!: string;

  @IsBoolean()
  public isSpecialOffer!: boolean;
}
