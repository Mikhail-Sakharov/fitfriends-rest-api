import {ApiProperty} from '@nestjs/swagger';
import {MinLength, MaxLength, IsEnum, IsNumber, IsInt, Min, Max, IsString, Matches, IsBoolean} from 'class-validator';
import {TrainingTitleLength, PRICE_DEFAULT_VALUE, TrainingCaloriesCount, TrainingDescriptionLength, VIDEO_URL_REG_EXP} from 'src/app.constant';
import {Duration} from 'src/types/duration.enum';
import {TrainingGenderType} from 'src/types/training-gender.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

export default class UpdateTrainingDto {
  @ApiProperty({
    description: 'Training title',
    example: 'energy'
  })
  @MinLength(TrainingTitleLength.MIN)
  @MaxLength(TrainingTitleLength.MAX)
  public title?: string;

  @ApiProperty({
    description: 'User\'s training level',
    example: 'любитель'
  })
  @IsEnum(TrainingLevel)
  public level?: TrainingLevel;

  @ApiProperty({
    description: 'Type of training',
    example: 'стрейчинг'
  })
  @IsEnum(TrainingType)
  public type?: TrainingType;

  @ApiProperty({
    description: 'Training duration',
    example: '30-50 мин'
  })
  @IsEnum(Duration)
  public duration?: Duration;

  @ApiProperty({
    description: 'Training price',
    example: 1500
  })
  @IsNumber()
  @IsInt()
  @Min(PRICE_DEFAULT_VALUE)
  public price?: number;

  @ApiProperty({
    description: 'Training calories number to burn',
    example: 1500
  })
  @Min(TrainingCaloriesCount.MIN)
  @Max(TrainingCaloriesCount.MAX)
  public caloriesCount?: number;

  @ApiProperty({
    description: 'Training description text',
    example: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.'
  })
  @MinLength(TrainingDescriptionLength.MIN)
  @MaxLength(TrainingDescriptionLength.MAX)
  public description?: string;

  @ApiProperty({
    description: 'What gender the training is destined for',
    example: 'для всех'
  })
  @IsEnum(TrainingGenderType)
  public gender?: TrainingGenderType;

  @ApiProperty({
    description: 'Training video URL',
    example: 'videos/0q3874yr-4q3rq3-q34r-erq74.mp4'
  })
  @IsString()
  @Matches(VIDEO_URL_REG_EXP)
  public videoUrl?: string;

  @ApiProperty({
    description: 'Indicates if the training is special offer',
    example: true
  })
  @IsBoolean()
  public isSpecialOffer?: boolean;
}
