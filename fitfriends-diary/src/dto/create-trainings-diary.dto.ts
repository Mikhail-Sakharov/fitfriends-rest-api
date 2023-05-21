import {ApiProperty} from '@nestjs/swagger';
import {IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {TrainingCaloriesCount, TrainingTitleLength} from 'src/app.constant';

export class CreateTrainingsDiaryDto {
  @ApiProperty({
    description: 'The Mongo ID of the respective training in the DB',
    example: '64174be02541b3f1599b4cc2'
  })
  @IsMongoId()
  public trainingId: string;

  @ApiProperty({
    description: 'Training title',
    example: 'energy'
  })
  @IsString()
  @MinLength(TrainingTitleLength.MIN)
  @MaxLength(TrainingTitleLength.MAX)
  public trainingTitle: string;

  @ApiProperty({
    description: 'Training calories number to burn',
    example: 1500
  })
  @IsNumber()
  @Min(TrainingCaloriesCount.MIN)
  @Max(TrainingCaloriesCount.MAX)
  public caloriesCount: number;

  @ApiProperty({
    description: 'Training duration',
    example: 10
  })
  @IsNumber()
  public duration: number;
}
