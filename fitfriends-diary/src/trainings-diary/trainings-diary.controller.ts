import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {fillObject} from 'common/helpers';
import {CreateTrainingsDiaryDto} from 'src/dto/create-trainings-diary.dto';
import {TrainingsDiaryRdo} from 'src/rdo/trainings-diary.rdo';
import {TrainingsDiaryService} from './trainings-diary.service';

@Controller('trainings-diary')
export class TrainingsDiaryController {
  constructor(
    private readonly trainingsDiaryService: TrainingsDiaryService
  ) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createTrainingsDiary(
    @Body() dto: CreateTrainingsDiaryDto
  ) {
    const trainingsDiary = await this.trainingsDiaryService.createTrainingsDiary(dto);
    return fillObject(TrainingsDiaryRdo, trainingsDiary);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getTrainingsDiaries() {
    const trainingsDiaries = await this.trainingsDiaryService.getTrainingsDiaries();
    return fillObject(TrainingsDiaryRdo, trainingsDiaries);
  }
}
