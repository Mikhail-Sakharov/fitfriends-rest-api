import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {
  MinLength,
  MaxLength,
  IsEnum,
  IsString,
  Matches,
  IsOptional,
  IsNumber,
  Min,
  IsInt,
  Max,
} from 'class-validator';
import {
  TrainingTitleLength,
  TrainingCaloriesCount,
  TrainingDescriptionLength,
  BG_IMAGE_URL_REG_EXP,
  PRICE_DEFAULT_VALUE,
} from 'src/app.constant';
import {Duration} from 'src/types/duration.enum';
import {TrainingGenderType} from 'src/types/training-gender.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

export default class CreateTrainingDto {
  @ApiProperty({
    description: 'Training title',
    example: 'energy'
  })
  @MinLength(TrainingTitleLength.MIN)
  @MaxLength(TrainingTitleLength.MAX)
  public title!: string;

  @ApiProperty({
    description: 'Training background image',
    example: 'img/content/thumbnails/training-02.jpg'
  })
  @IsString()
  @Matches(BG_IMAGE_URL_REG_EXP)
  public bgImageUrl!: string;

  @ApiProperty({
    description: 'User\'s training level',
    example: 'любитель'
  })
  @IsEnum(TrainingLevel)
  public level!: TrainingLevel;

  @ApiProperty({
    description: 'Type of training',
    example: 'стрейчинг'
  })
  @IsEnum(TrainingType)
  public type!: TrainingType;

  @ApiProperty({
    description: 'Training duration',
    example: '30-50 мин'
  })
  @IsEnum(Duration)
  public duration!: Duration;

  @ApiProperty({
    description: 'Training price',
    example: 1500
  })
  @IsOptional()
  @Transform(({obj}) => Number(obj.price))
  @IsNumber()
  @IsInt()
  @Min(PRICE_DEFAULT_VALUE)
  public price?: number;

  @ApiProperty({
    description: 'Training calories number to burn',
    example: 1500
  })
  @Transform(({obj}) => Number(obj.caloriesCount))
  @Min(TrainingCaloriesCount.MIN)
  @Max(TrainingCaloriesCount.MAX)
  public caloriesCount!: number;

  @ApiProperty({
    description: 'Training description text',
    example: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.'
  })
  @MinLength(TrainingDescriptionLength.MIN)
  @MaxLength(TrainingDescriptionLength.MAX)
  public description!: string;

  @ApiProperty({
    description: 'What gender the training is destined for',
    example: 'для всех'
  })
  @IsEnum(TrainingGenderType)
  public gender!: TrainingGenderType;
}
