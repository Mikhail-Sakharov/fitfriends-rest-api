import {Injectable} from '@nestjs/common';
import CreateTrainingDto from 'src/dto/create-training.dto';
import UpdateTrainingDto from 'src/dto/update-training.dto';
import {TrainingEntity} from './training.entity';
import {TrainingRepository} from './trainings.repository';

@Injectable()
export class TrainingsService {
  constructor(
    private readonly trainingRepository: TrainingRepository
  ) {}

  public async create(dto: CreateTrainingDto) {
    const trainingEntity = new TrainingEntity(dto);
    return await this.trainingRepository.create(trainingEntity);
  }

  public async findTrainings() {
    const trainings = await this.trainingRepository.find();
    return trainings;
  }

  public async showTraining(id: string) {
    const training = await this.trainingRepository.findById(id);
    return training;
  }

  public async updateTraining(id: string, dto: UpdateTrainingDto) {
    const training = await this.trainingRepository.findById(id);

    const updatedTrainingEntity = new TrainingEntity({...training, ...dto});
    const updatedTraining = await this.trainingRepository.update(id, updatedTrainingEntity);
    return updatedTraining;
  }
}
