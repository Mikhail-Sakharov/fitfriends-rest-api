import {ForbiddenException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import * as fs from 'fs';
import CreateTrainingDto from 'src/dto/create-training.dto';
import UpdateTrainingDto from 'src/dto/update-training.dto';
import {GetTrainingsQuery} from 'src/query/get-trainings.query';
import {TrainingEntity} from './training.entity';
import {TrainingRepository} from './trainings.repository';
import {RABBITMQ_SERVICE} from 'src/app.constant';
import {ClientProxy} from '@nestjs/microservices';
import {CommandEvent} from 'src/types/command-event.enum';
import {GetTrainingsCatalogQuery} from 'src/query/get-trainings-catalog.query';
import {GetRecommendedTrainingsQuery} from 'src/query/get-recommended-trainings.query';

@Injectable()
export class TrainingsService {
  constructor(
    private readonly trainingsRepository: TrainingRepository,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  public async create(coachId: string, coachName: string, dto: CreateTrainingDto) {
    const trainingEntity = new TrainingEntity({...dto, coachId});

    this.rabbitClient.emit(
      {cmd: CommandEvent.CreateNewTraining},
      {
        coachId,
        coachName,
        trainingType: dto.type,
        trainingTitle: dto.title,
        trainingDescription: dto.description,
        trainingGender: dto.gender,
        trainingLevel: dto.level,
        trainingDuration: dto.duration,
        trainingCaloriesCount: dto.caloriesCount,
        trainingPrice: dto.price
      }
    );

    return await this.trainingsRepository.create(trainingEntity);
  }

  public async getTrainingsCatalog(query?: GetTrainingsCatalogQuery) {
    const trainings = await this.trainingsRepository.find(query);
    return trainings;
  }

  public async getRecommendedTrainings(query?: GetRecommendedTrainingsQuery) {
    const trainings = await this.trainingsRepository.findRecommended(query);
    return trainings;
  }

  public async findTrainings(coachId: string, query?: GetTrainingsQuery) {
    const trainings = await this.trainingsRepository.findManyByCoachId(coachId, query);
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

  public async calculateRating(trainingId: string, currentReviewRating: number, currentReviewsCount: number) {
    const training = await this.trainingsRepository.findById(trainingId);
    if (!training) {
      throw new NotFoundException('No trainings found with such id');
    }
    const currentTrainingRating = training.rating;
    const rating = +((currentTrainingRating * currentReviewsCount + currentReviewRating)/(currentReviewsCount + 1)).toFixed(1);
    const updatedTrainingEntity = new TrainingEntity({...training, rating});
    await this.trainingsRepository.update(trainingId, updatedTrainingEntity);
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
