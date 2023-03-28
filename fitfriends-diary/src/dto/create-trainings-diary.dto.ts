import {IsEnum, IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {TrainingCaloriesCount, TrainingTitleLength} from 'src/app.constant';
import {Duration} from 'src/types/duration.enum';

export class CreateTrainingsDiaryDto {
  @IsMongoId()
  public trainingId: string;

  @IsString()
  @MinLength(TrainingTitleLength.MIN)
  @MaxLength(TrainingTitleLength.MAX)
  public trainingTitle: string;

  @IsNumber()
  @Min(TrainingCaloriesCount.MIN)
  @Max(TrainingCaloriesCount.MAX)
  public caloriesCount: number;

  @IsEnum(Duration)
  public duration: Duration;
}
