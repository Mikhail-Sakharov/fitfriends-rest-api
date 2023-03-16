import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
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

  public async find(): Promise<Training[]> {
    return this.trainingModel.find();
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
