import {ForbiddenException, Injectable} from '@nestjs/common';
import * as fs from 'fs';
import CreateTrainingDto from 'src/dto/create-training.dto';
import UpdateTrainingDto from 'src/dto/update-training.dto';
import {GetTrainings} from 'src/query/get-trainings.query';
import {TrainingEntity} from './training.entity';
import {TrainingRepository} from './trainings.repository';

@Injectable()
export class TrainingsService {
  constructor(
    private readonly trainingsRepository: TrainingRepository
  ) {}

  public async create(coachId: string, dto: CreateTrainingDto) {
    const trainingEntity = new TrainingEntity({...dto, coachId});
    return await this.trainingsRepository.create(trainingEntity);
  }

  public async findTrainings(coachId: string, query: GetTrainings) {
    const trainings = await this.trainingsRepository.find(coachId, query);
    return trainings;
  }

  public async showTraining(id: string) {
    const training = await this.trainingsRepository.findById(id);
    return training;
  }

  public async updateTraining(coachId: string, id: string, dto: UpdateTrainingDto) {
    const training = await this.trainingsRepository.findById(id);

    if (coachId !== training.coachId) {
      throw new ForbiddenException('Access denied');
    }

    const updatedTrainingEntity = new TrainingEntity({...training, ...dto});
    const updatedTraining = await this.trainingsRepository.update(id, updatedTrainingEntity);
    return updatedTraining;
  }

  public async setVideoFilePath(coachId: string, trainingId: string, videoUrl: string) {
    const training = await this.trainingsRepository.findById(trainingId);

    if (training.coachId !== coachId) {
      throw new ForbiddenException('Access denied');
    }

    const prevVideoUrl = training.videoUrl;

    if (fs.existsSync(prevVideoUrl)) {
      fs.unlink(prevVideoUrl, (err) => {
        if (err) {
         console.error(err);
         return err;
        }
      });
    }
    return this.updateTraining(coachId, trainingId, {videoUrl});
  }
}