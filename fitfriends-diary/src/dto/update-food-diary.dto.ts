import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsNumber, IsOptional} from 'class-validator';
import {MealType} from 'src/types/meal-type.enum';
import {WeekDay} from 'src/types/week-day.enum';

export class UpdateFoodDiaryDto {
  @ApiProperty({
    description: 'The day of a week the diary was created for',
    example: WeekDay.Friday
  })
  @IsOptional()
  @IsEnum(WeekDay)
  public weekDay?: WeekDay;

  @ApiProperty({
    description: 'The number of calories',
    example: 1500
  })
  @IsOptional()
  @IsNumber()
  public caloriesCount?: number;

  @ApiProperty({
    description: 'The type of the meal the user has had',
    example: 'завтрак'
  })
  @IsOptional()
  @IsEnum(MealType)
  public mealType?: MealType;
}
