import {MealType} from './meal-type.enum';
import {WeekDay} from './week-day.enum';

export interface FoodDiary {
  _id?: string;
  createdAt?: string;
  weekDay: WeekDay;
  userId: string;
  caloriesCount: number;
  mealType: MealType;
}
