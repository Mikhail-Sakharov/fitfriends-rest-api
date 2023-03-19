import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {GetTrainings} from 'src/query/get-trainings.query';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {SortOrderMap} from 'src/types/sort.types';
import {Training} from 'src/types/training.interface';
import {TrainingEntity} from './training.entity';
import {TrainingModel} from './training.model';

@Injectable()
export class TrainingRepository implements CRUDRepository<TrainingEntity, string, Training> {
  constructor(
    @InjectModel(TrainingModel.name) private readonly trainingModel: Model<TrainingModel>,
  ) {}

  public async create(item: TrainingEntity): Promise<Training> {
    const newTraining = new this.trainingModel(item);
    return newTraining.save();
  }

  public async find(coachId: string, query: GetTrainings): Promise<Training[]> {
    const minPrice = query.minPrice;
    const maxPrice = query.maxPrice;
    const minCaloriesCount = query.minCaloriesCount;
    const maxCaloriesCount = query.maxCaloriesCount;
    const rating = query.rating;
    const duration = query.duration;
    const sortType = query.sortType;
    const sortOrder = query.sortOrder;
    const page = query.page;
    const limit = query.limit;

    return this.trainingModel
      .find({coachId})
      .where('price').gte(minPrice ? minPrice : 0).lte(maxPrice ? maxPrice : 1000000)
      .where('caloriesCount').gte(minCaloriesCount ? minCaloriesCount : 0).lte(maxCaloriesCount ? maxCaloriesCount : 1000000)
      .where(rating ? {rating} : {})
      .where(duration ? {duration} : {})
      .sort({[sortType]: SortOrderMap[sortOrder]})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit ?? 0);
  }

  public async findById(id: string): Promise<Training | null> {
    return this.trainingModel.findById(id);
  }

  public async update(id: string, item: TrainingEntity): Promise<Training> {
    return this.trainingModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return this.trainingModel.findByIdAndDelete(id);
  }
}
