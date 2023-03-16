import {Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {fillObject} from 'common/helpers';
import CreateTrainingDto from 'src/dto/create-training.dto';
import UpdateTrainingDto from 'src/dto/update-training.dto';
import {TrainingRdo} from 'src/rdo/training.rdo';
import {TrainingsService} from './trainings.service';

@Controller('trainings')
export class TrainingsController {
  constructor(
    private readonly trainingService: TrainingsService
  ) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createTraining(
    @Body() dto: CreateTrainingDto
  ) {
    const training = await this.trainingService.create(dto);
    return fillObject(TrainingRdo, training);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getTrainings() {
    const trainings = await this.trainingService.findTrainings();
    return fillObject(TrainingRdo, trainings);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async showTraining(
    @Param('id') id: string
  ) {
    const training = await this.trainingService.showTraining(id);
    return fillObject(TrainingRdo, training);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async updateTraining(
    @Param('id') id: string,
    @Body() dto: UpdateTrainingDto
  ) {
    const training = await this.trainingService.updateTraining(id, dto);
    return fillObject(TrainingRdo, training);
  }
}
