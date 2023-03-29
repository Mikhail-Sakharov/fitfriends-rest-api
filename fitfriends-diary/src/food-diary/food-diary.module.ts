import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { FoodDiaryController } from './food-diary.controller';
import {FoodDiaryModel, FoodDiarySchema} from './food-diary.model';
import { FoodDiaryService } from './food-diary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: FoodDiaryModel.name, schema: FoodDiarySchema}
    ])
  ],
  controllers: [FoodDiaryController],
  providers: [FoodDiaryService]
})
export class FoodDiaryModule {}
