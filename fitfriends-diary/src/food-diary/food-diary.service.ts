import {ForbiddenException, Injectable} from '@nestjs/common';
import {CreateFoodDiaryDto} from 'src/dto/create-food-diary.dto';
import {UpdateFoodDiaryDto} from 'src/dto/update-food-diary.dto';
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

  public async getFoodDiaries(userId: string) {
    return await this.foodDiaryRepository.find(userId);
  }

  public async showFoodDiary(id: string, userId: string) {
    const foodDiary = await this.foodDiaryRepository.findById(id);
    if (foodDiary.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return foodDiary;
  }

  public async updateFoodDiary(id: string, userId: string, dto: UpdateFoodDiaryDto) {
    const foodDiary = await this.foodDiaryRepository.findById(id);
    if (foodDiary.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    const foodDiaryEntity = new FoodDiaryEntity({...foodDiary, ...dto});
    return await this.foodDiaryRepository.update(id, foodDiaryEntity);
  }

  public async deleteFoodDiary(id: string, userId: string) {
    const foodDiary = await this.foodDiaryRepository.findById(id);
    if (foodDiary.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return await this.foodDiaryRepository.destroy(id);
  }
}
