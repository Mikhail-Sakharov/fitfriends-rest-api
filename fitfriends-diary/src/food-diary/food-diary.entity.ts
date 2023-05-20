import {Entity} from 'src/types/entity.interface';
import {FoodDiary} from 'src/types/food-diary.interface';
import {MealType} from 'src/types/meal-type.enum';
import {WeekDay} from 'src/types/week-day.enum';

export class FoodDiaryEntity implements FoodDiary, Entity<FoodDiary> {
  public weekDay: WeekDay;
  public userId: string;
  public caloriesCount: number;
  public mealType: MealType;

  constructor(foodDiary: FoodDiary) {
    this.fillEntity(foodDiary);
  }

  toObject(): FoodDiary {
    return {...this};
  }
  fillEntity(foodDiary: FoodDiary) {
    this.weekDay = foodDiary.weekDay;
    this.userId = foodDiary.userId;
    this.caloriesCount = foodDiary.caloriesCount;
    this.mealType = foodDiary.mealType;
  }

}
