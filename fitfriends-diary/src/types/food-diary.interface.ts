import {MealType} from './meal-type.enum';

export interface FoodDiary {
  _id?: string;
  createdAt?: string;
  userId: string;
  caloriesCount: number;
  mealType: MealType;
}
