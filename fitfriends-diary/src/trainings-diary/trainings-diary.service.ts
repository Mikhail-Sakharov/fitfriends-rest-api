import {Injectable} from '@nestjs/common';
import {CreateTrainingsDiaryDto} from 'src/dto/create-trainings-diary.dto';
import {TrainingsDiaryEntity} from './trainings-diary.entity';
import {TrainingsDiaryRepository} from './trainings-diary.repository';

@Injectable()
export class TrainingsDiaryService {
  constructor(
    private readonly trainingsDiaryRepository: TrainingsDiaryRepository
  ) {}

  public async createTrainingsDiary(dto: CreateTrainingsDiaryDto) {
    const trainingsDiaryEntity = new TrainingsDiaryEntity(dto);
    return await this.trainingsDiaryRepository.create(trainingsDiaryEntity);
  }
}
