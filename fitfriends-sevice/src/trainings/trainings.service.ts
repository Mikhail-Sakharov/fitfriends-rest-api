import {Injectable} from '@nestjs/common';
import CreateTrainingDto from 'src/dto/create-training.dto';
import {TrainingEntity} from './training.entity';
import {TrainingRepository} from './trainings.repository';

@Injectable()
export class TrainingsService {
  constructor(
    private readonly trainingRepository: TrainingRepository
  ) {}

  async create(dto: CreateTrainingDto) {
    const trainingEntity = new TrainingEntity(dto);
    return await this.trainingRepository.create(trainingEntity);
  }
}
