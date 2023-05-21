import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {FoodDiary} from 'src/types/food-diary.interface';
import {FoodDiaryEntity} from './food-diary.entity';
import {FoodDiaryModel} from './food-diary.model';
import {getCurrentWeekRange} from 'common/helpers';

@Injectable()
export class FoodDiaryRepository implements CRUDRepository<FoodDiaryEntity, string, FoodDiary> {
  constructor(
    @InjectModel(FoodDiaryModel.name) private readonly foodDiaryModel: Model<FoodDiaryModel>
  ) {}

  public async create(item: FoodDiaryEntity): Promise<FoodDiary> {
    const newFoodDiary = new this.foodDiaryModel(item);
    return await newFoodDiary.save();
  }

  public async find(userId: string): Promise<FoodDiary[]> {
    const range = getCurrentWeekRange();

    return await this.foodDiaryModel
      .find({userId})
      .where({
        'createdAt': {
          $gte: range.startDate, 
          $lt: range.endDate
        }
      });
  }

  public async findById(id: string): Promise<FoodDiary | null> {
    return await this.foodDiaryModel.findById(id);
  }

  public async update(id: string, item: FoodDiaryEntity): Promise<FoodDiary> {
    return await this.foodDiaryModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return await this.foodDiaryModel.findByIdAndDelete(id);
  }
}
