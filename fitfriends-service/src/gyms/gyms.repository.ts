import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {Gym} from 'src/types/gym.interface';
import {GymsEntity} from './gyms.entity';
import {GymsModel} from './gyms.model';
import {GetGymsQuery} from 'src/query/get-gyms.query';
import {RESPONSE_ENTITIES_MAX_COUNT, TrainingPrice} from 'src/app.constant';
import {SortOrderMap} from 'src/types/sort.types';

export class GymsRepository implements CRUDRepository<GymsEntity, string, Gym> {
  constructor(
    @InjectModel(GymsModel.name) private readonly gymsModel: Model<GymsModel>
  ) {}

  public async create(item: GymsEntity): Promise<Gym> {
    const newGym = new this.gymsModel(item);
    return await newGym.save();
  }

  public async seed(items: GymsEntity[]): Promise<Gym[]> {    
    return await this.gymsModel.create(items);
  }

  public async find(): Promise<Gym[]> {
    return await this.gymsModel.find();
  }

  public async getCatalog(query?: GetGymsQuery): Promise<Gym[]> {
    const {
      minPrice,
      maxPrice,
      location,
      features,
      isVerified,
      sortType,
      sortOrder,
      page,
      limit
    } = query;

    /* if (!query) {
      return await this.gymsModel.find();
    } */

    return await this.gymsModel
      .find()
      .where(isVerified ? {isVerified: true} : {})
      .where('price').gte(minPrice ? minPrice : TrainingPrice.MIN).lte(maxPrice ? maxPrice : TrainingPrice.MAX)
      .where(location ? {location: {$in: location.split(',')}} : {})
      .where(features ? {features: {$in: features.split(',')}} : {})
      .sort({[sortType]: SortOrderMap[sortOrder]})
      .skip(page > 0 ? (page - 1) * limit : 0)
      .limit(limit ?? RESPONSE_ENTITIES_MAX_COUNT);
  }

  public async findById(id: string): Promise<Gym | null> {
    return await this.gymsModel.findById(id);
  }

  public async update(id: string, item: GymsEntity): Promise<Gym> {
    return await this.gymsModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return await this.gymsModel.findByIdAndDelete(id);
  }
}