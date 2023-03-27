import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {TrainingsDiary} from 'src/types/trainings-diary.interface';
import {TrainingsDiaryEntity} from './trainings-diary.entity';
import {TrainingsDiaryModel} from './trainings-diary.model';

@Injectable()
export class TrainingsDiaryRepository implements CRUDRepository<TrainingsDiaryEntity, string, TrainingsDiary> {
  constructor(
    @InjectModel(TrainingsDiaryModel.name) private readonly trainingsDiaryModel: Model<TrainingsDiaryModel>
  ) {}

  public async create(item: TrainingsDiaryEntity): Promise<TrainingsDiary> {
    const newTrainingsDiary = new this.trainingsDiaryModel(item);
    return newTrainingsDiary.save();
  }

  public async findById(id: string): Promise<TrainingsDiary | null> {
    return this.trainingsDiaryModel.findById(id);
  }

  public async update(id: string, item: TrainingsDiaryEntity): Promise<TrainingsDiary> {
    return this.trainingsDiaryModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return this.trainingsDiaryModel.findByIdAndDelete(id);
  }
}
