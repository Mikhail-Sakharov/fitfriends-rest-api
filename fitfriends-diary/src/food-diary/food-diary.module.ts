import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';
import {FoodDiaryController} from './food-diary.controller';
import {FoodDiaryModel, FoodDiarySchema} from './food-diary.model';
import {FoodDiaryRepository} from './food-diary.repository';
import {FoodDiaryService} from './food-diary.service';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {name: FoodDiaryModel.name, schema: FoodDiarySchema}
    ])
  ],
  controllers: [FoodDiaryController],
  providers: [FoodDiaryService, FoodDiaryRepository, AccessTokenStrategy]
})
export class FoodDiaryModule {}
