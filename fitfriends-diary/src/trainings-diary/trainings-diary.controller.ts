import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {CreateTrainingsDiaryDto} from 'src/dto/create-trainings-diary.dto';
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
    return trainingsDiary;
  }
}
