import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {Gym} from 'src/types/gym.interface';
import {GymsEntity} from './gyms.entity';
import {GymsModel} from './gyms.model';

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