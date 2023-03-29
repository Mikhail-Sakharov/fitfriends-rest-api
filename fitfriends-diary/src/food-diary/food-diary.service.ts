import {Injectable} from '@nestjs/common';
import {CreateFoodDiaryDto} from 'src/dto/create-food-diary.dto';
import {FoodDiaryEntity} from './food-diary.entity';
import {FoodDiaryRepository} from './food-diary.repository';

@Injectable()
export class FoodDiaryService {
  constructor(
    private readonly foodDiaryRepository: FoodDiaryRepository
  ) {}

  public async createFoodDiary(dto: CreateFoodDiaryDto & {userId: string}) {
    const trainingsDiaryEntity = new FoodDiaryEntity(dto);
    return await this.foodDiaryRepository.create(trainingsDiaryEntity);
  }
}
