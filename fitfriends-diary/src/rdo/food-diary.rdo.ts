import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';
import {MealType} from 'src/types/meal-type.enum';

export class FoodDiaryRdo {
  @ApiProperty({
    description: 'The unique MongoDB ID',
    example: '6410a7b666d4c557792f0382'
  })
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'The date of the diary entry creation',
    example: '2023-03-14T16:58:30.805Z'
  })
  @Expose()
  public createdAt: string[];

  @ApiProperty({
    description: 'The unique MongoDB ID of the user who has created the diary',
    example: '6410a7b666d4c557792f0383'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'The number of calories',
    example: 1500
  })
  @Expose()
  public caloriesCount: number;

  @ApiProperty({
    description: 'The type of the meal the user has had',
    example: 'завтрак'
  })
  @Expose()
  public mealType: MealType;
}
