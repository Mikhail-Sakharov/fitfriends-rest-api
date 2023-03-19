import {ForbiddenException, Injectable} from '@nestjs/common';
import CreateTrainingDto from 'src/dto/create-training.dto';
import UpdateTrainingDto from 'src/dto/update-training.dto';
import {GetTrainings} from 'src/query/get-trainings.query';
import {TrainingEntity} from './training.entity';
import {TrainingRepository} from './trainings.repository';

@Injectable()
export class TrainingsService {
  constructor(
    private readonly trainingRepository: TrainingRepository
  ) {}

  public async create(coachId: string, dto: CreateTrainingDto) {
    const trainingEntity = new TrainingEntity({...dto, coachId});
    return await this.trainingRepository.create(trainingEntity);
  }

  public async findTrainings(coachId: string, query: GetTrainings) {
    const trainings = await this.trainingRepository.find(coachId, query);
    return trainings;
  }

  public async showTraining(id: string) {
    const training = await this.trainingRepository.findById(id);
    return training;
  }

  public async updateTraining(coachId: string, id: string, dto: UpdateTrainingDto) {
    const training = await this.trainingRepository.findById(id);

    if (coachId !== training.coachId) {
      throw new ForbiddenException('Access denied');
    }

    const updatedTrainingEntity = new TrainingEntity({...training, ...dto});
    const updatedTraining = await this.trainingRepository.update(id, updatedTrainingEntity);
    return updatedTraining;
  }
}
