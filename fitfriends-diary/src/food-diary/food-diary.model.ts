import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {FoodDiary} from 'src/types/food-diary.interface';
import {MealType} from 'src/types/meal-type.enum';

@Schema({
  collection: 'food-diary', 
  timestamps: true,
})
export class FoodDiaryModel extends Document implements FoodDiary {
  @Prop({
    required: true
  })
  userId: string;

  @Prop({
    required: true
  })
  caloriesCount: number;

  @Prop({
    required: true
  })
  mealType: MealType;
}

export const FoodDiarySchema = SchemaFactory.createForClass(FoodDiaryModel);