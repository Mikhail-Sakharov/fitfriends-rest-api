import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {GetTrainingsQuery} from 'src/query/get-trainings.query';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {SortOrder, SortOrderMap, SortType} from 'src/types/sort.types';
import {Training} from 'src/types/training.interface';
import {TrainingEntity} from './training.entity';
import {TrainingModel} from './training.model';
import {GetTrainingsCatalogQuery} from 'src/query/get-trainings-catalog.query';
import {RATING_DEFAULT_VALUE, RESPONSE_ENTITIES_MAX_COUNT, ReviewRatingCount, TrainingCaloriesCount, TrainingPrice} from 'src/app.constant';
import {GetRecommendedTrainingsQuery} from 'src/query/get-recommended-trainings.query';

@Injectable()
export class TrainingRepository implements CRUDRepository<TrainingEntity, string, Training> {
  constructor(
    @InjectModel(TrainingModel.name) private readonly trainingModel: Model<TrainingModel>,
  ) {}

  public async create(item: TrainingEntity): Promise<Training> {
    const newTraining = new this.trainingModel(item);
    return newTraining.save();
  }

  public async find(query?: GetTrainingsCatalogQuery) {
    const {
      minPrice,
      maxPrice,
      minCaloriesCount,
      maxCaloriesCount,
      minRating,
      maxRating,
      trainingType,
      sortType,
      sortOrder,
      page,
      limit
    } = query;

    return this.trainingModel
      .find()
      .where('price')
        .gte(minPrice ?? TrainingPrice.MIN)
        .lte(maxPrice ?? TrainingPrice.MAX)
      .where('caloriesCount')
        .gte(minCaloriesCount ?? TrainingCaloriesCount.MIN)
        .lte(maxCaloriesCount ?? TrainingCaloriesCount.MAX)
      .where('rating')
        .gte(minRating ?? RATING_DEFAULT_VALUE)
        .lte(maxRating ?? ReviewRatingCount.MAX)
      .where(trainingType ? {type: {$in: trainingType.split(',')}} : {})
      .sort({[sortType ?? SortType.Date]: sortOrder ? SortOrderMap[sortOrder] : SortOrder.Down})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit && limit <= RESPONSE_ENTITIES_MAX_COUNT ? limit : RESPONSE_ENTITIES_MAX_COUNT);
  }

  public async findRecommended(query?: GetRecommendedTrainingsQuery) {
    const {
      minCaloriesCount,
      maxCaloriesCount,
      duration,
      trainingType,
      trainingLevel,
      sortType,
      sortOrder,
      page,
      limit
    } = query;

    const firstRecommendedTrainingsQueue = await this.trainingModel
      .find()
      .where('caloriesCount')
        .gte(minCaloriesCount ?? TrainingCaloriesCount.MIN)
        .lte(maxCaloriesCount ?? TrainingCaloriesCount.MAX)
      .where(duration ? {duration: {$in: duration.split(',')}} : {})
      .where(trainingType ? {type: {$in: trainingType.split(',')}} : {})
      .where(trainingLevel ? {level: {$in: trainingLevel.split(',')}} : {})
      .sort({[sortType ?? SortType.Date]: sortOrder ? SortOrderMap[sortOrder] : SortOrder.Down})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit && limit <= RESPONSE_ENTITIES_MAX_COUNT ? limit : RESPONSE_ENTITIES_MAX_COUNT);

    const secondRecommendedTrainingsQueue = await this.trainingModel
      .find()
      .where(trainingType ? {type: {$in: trainingType.split(',')}} : {})
      .sort({[sortType ?? SortType.Date]: sortOrder ? SortOrderMap[sortOrder] : SortOrder.Down})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit && limit <= RESPONSE_ENTITIES_MAX_COUNT ? limit : RESPONSE_ENTITIES_MAX_COUNT);

    const thirdRecommendedTrainingsQueue = await this.trainingModel
      .find()
      .where(trainingLevel ? {level: {$in: trainingLevel.split(',')}} : {})
      .sort({[sortType ?? SortType.Date]: sortOrder ? SortOrderMap[sortOrder] : SortOrder.Down})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit && limit <= RESPONSE_ENTITIES_MAX_COUNT ? limit : RESPONSE_ENTITIES_MAX_COUNT);

    const forthRecommendedTrainingsQueue = await this.trainingModel
      .find()
      .where('caloriesCount')
        .gte(minCaloriesCount ?? TrainingCaloriesCount.MIN)
        .lte(maxCaloriesCount ?? TrainingCaloriesCount.MAX)
      .sort({[sortType ?? SortType.Date]: sortOrder ? SortOrderMap[sortOrder] : SortOrder.Down})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit && limit <= RESPONSE_ENTITIES_MAX_COUNT ? limit : RESPONSE_ENTITIES_MAX_COUNT);

    const fifthRecommendedTrainingsQueue = await this.trainingModel
      .find()
      .where(duration ? {duration: {$in: duration.split(',')}} : {})
      .sort({[sortType ?? SortType.Date]: sortOrder ? SortOrderMap[sortOrder] : SortOrder.Down})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit && limit <= RESPONSE_ENTITIES_MAX_COUNT ? limit : RESPONSE_ENTITIES_MAX_COUNT);

    const allQueues = [
      ...firstRecommendedTrainingsQueue,
      ...secondRecommendedTrainingsQueue,
      ...thirdRecommendedTrainingsQueue,
      ...forthRecommendedTrainingsQueue,
      ...fifthRecommendedTrainingsQueue
    ];

    let allUniqueRecommendedTrainingsIds = Array.from(new Set(allQueues.map((training) => training._id.toString())));

    const allUniqueTraining = allQueues.filter((training) => {
      const filteredTrainingCondition = allUniqueRecommendedTrainingsIds.includes(training.id);
      allUniqueRecommendedTrainingsIds = [...allUniqueRecommendedTrainingsIds].filter((id) => id !== training.id);
      return filteredTrainingCondition;
    });

    return allUniqueTraining;
  }

  public async findManyByCoachId(coachId: string, query?: GetTrainingsQuery): Promise<Training[]> {
    const minPrice = query && query.minPrice;
    const maxPrice = query && query.maxPrice;
    const minCaloriesCount = query && query.minCaloriesCount;
    const maxCaloriesCount = query && query.maxCaloriesCount;
    const minRating = query && query.minRating;
    const maxRating = query && query.maxRating;
    const duration = query && query.duration;
    const sortType = query && query.sortType;
    const sortOrder = query && query.sortOrder;
    const page = query && query.page;
    const limit = query && query.limit;

    return this.trainingModel
      .find({coachId})
      .where('price')
        .gte(minPrice ?? TrainingPrice.MIN)
        .lte(maxPrice ?? TrainingPrice.MAX)
      .where('caloriesCount')
        .gte(minCaloriesCount ?? TrainingCaloriesCount.MIN)
        .lte(maxCaloriesCount ?? TrainingCaloriesCount.MAX)
      .where('rating')
        .gte(minRating ?? RATING_DEFAULT_VALUE)
        .lte(maxRating ?? ReviewRatingCount.MAX)
      .where(duration ? {duration: {$in: duration.split(',')}} : {})
      .sort({[sortType ?? SortType.Date]: sortOrder ? SortOrderMap[sortOrder] : SortOrder.Down})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit && limit <= RESPONSE_ENTITIES_MAX_COUNT ? limit : RESPONSE_ENTITIES_MAX_COUNT);
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
