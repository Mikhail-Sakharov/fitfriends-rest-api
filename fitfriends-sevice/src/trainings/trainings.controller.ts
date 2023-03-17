import {Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import CreateTrainingDto from 'src/dto/create-training.dto';
import UpdateTrainingDto from 'src/dto/update-training.dto';
import {TrainingRdo} from 'src/rdo/training.rdo';
import {TrainingsService} from './trainings.service';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingsController {
  constructor(
    private readonly trainingService: TrainingsService
  ) {}

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The training was created'
  })
  // СОЗДАНИЕ ТРЕНИРОВКИ
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createTraining(
    @Body() dto: CreateTrainingDto
  ) {
    const training = await this.trainingService.create(dto);
    return fillObject(TrainingRdo, training);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The list of trainings was received'
  })
  // СПИСОК ТРЕНИРОВОК
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getTrainings() {
    const trainings = await this.trainingService.findTrainings();
    return fillObject(TrainingRdo, trainings);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The training was received'
  })
  // ДЕТАЛЬНАЯ ИНФОРМАЦИЯ
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async showTraining(
    @Param('id') id: string
  ) {
    const training = await this.trainingService.showTraining(id);
    return fillObject(TrainingRdo, training);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The training was updated'
  })
  // РЕДАКТИРОВАНИЕ ТРЕНИРОВКИ
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async updateTraining(
    @Param('id') id: string,
    @Body() dto: UpdateTrainingDto
  ) {
    const training = await this.trainingService.updateTraining(id, dto);
    return fillObject(TrainingRdo, training);
  }

  // ВЫГРУЗКА ВИДЕО
}
