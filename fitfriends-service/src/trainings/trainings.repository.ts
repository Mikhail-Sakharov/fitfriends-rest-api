import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {GetTrainings} from 'src/query/get-trainings.query';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {SortOrderMap} from 'src/types/sort.types';
import {Training} from 'src/types/training.interface';
import {TrainingEntity} from './training.entity';
import {TrainingModel} from './training.model';
import {GetTrainingsCatalog} from 'src/query/get-trainings-catalog.query';
import {RESPONSE_ENTITIES_MAX_COUNT, TrainingCaloriesCount, TrainingPrice} from 'src/app.constant';

@Injectable()
export class TrainingRepository implements CRUDRepository<TrainingEntity, string, Training> {
  constructor(
    @InjectModel(TrainingModel.name) private readonly trainingModel: Model<TrainingModel>,
  ) {}

  public async create(item: TrainingEntity): Promise<Training> {
    const newTraining = new this.trainingModel(item);
    return newTraining.save();
  }

  public async find(query: GetTrainingsCatalog) {
    const {
      minPrice,
      maxPrice,
      minCaloriesCount,
      maxCaloriesCount,
      rating,
      sortType,
      sortOrder,
      page,
      limit
    } = query;

    return this.trainingModel
      .find()
      .where('price').gte(minPrice ? minPrice : TrainingPrice.MIN).lte(maxPrice ? maxPrice : TrainingPrice.MAX)
      .where('caloriesCount').gte(minCaloriesCount ? minCaloriesCount : TrainingCaloriesCount.MIN).lte(maxCaloriesCount ? maxCaloriesCount : TrainingCaloriesCount.MAX)
      .where(rating ? {rating} : {})
      .sort({[sortType]: SortOrderMap[sortOrder]})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit ?? RESPONSE_ENTITIES_MAX_COUNT);
  }

  public async findManyByCoachId(coachId: string, query: GetTrainings): Promise<Training[]> {
    const {
      minPrice,
      maxPrice,
      minCaloriesCount,
      maxCaloriesCount,
      rating,
      duration,
      sortType,
      sortOrder,
      page,
      limit
    } = query;

    return this.trainingModel
      .find({coachId})
      .where('price').gte(minPrice ? minPrice : TrainingPrice.MIN).lte(maxPrice ? maxPrice : TrainingPrice.MAX)
      .where('caloriesCount').gte(minCaloriesCount ? minCaloriesCount : TrainingCaloriesCount.MIN).lte(maxCaloriesCount ? maxCaloriesCount : TrainingCaloriesCount.MAX)
      .where(rating ? {rating} : {})
      .where(duration ? {duration} : {})
      .sort({[sortType]: SortOrderMap[sortOrder]})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit ?? RESPONSE_ENTITIES_MAX_COUNT);
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
