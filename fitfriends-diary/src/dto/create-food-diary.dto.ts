import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsNumber} from 'class-validator';
import {MealType} from 'src/types/meal-type.enum';

export class CreateFoodDiaryDto {
  @ApiProperty({
    description: 'The number of calories',
    example: 1500
  })
  @IsNumber()
  public caloriesCount: number;

  @ApiProperty({
    description: 'The type of the meal the user has had',
    example: 'завтрак'
  })
  @IsEnum(MealType)
  public mealType: MealType;
}
