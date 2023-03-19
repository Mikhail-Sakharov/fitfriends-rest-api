import {Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import CreateTrainingDto from 'src/dto/create-training.dto';
import UpdateTrainingDto from 'src/dto/update-training.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {TrainingRdo} from 'src/rdo/training.rdo';
import {Payload} from 'src/types/payload.interface';
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
  @UseGuards(AccessTokenGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createTraining(
    @Body() dto: CreateTrainingDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const coachId = req.user.sub;
    const training = await this.trainingService.create(coachId, dto);
    return fillObject(TrainingRdo, training);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The list of trainings was received'
  })
  // СПИСОК ТРЕНИРОВОК
  @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getTrainings(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const coachId = req.user.sub;
    const trainings = await this.trainingService.findTrainings(coachId);
    return fillObject(TrainingRdo, trainings);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.CREATED,
    description: 'The training was received'
  })
  // ДЕТАЛЬНАЯ ИНФОРМАЦИЯ
  @UseGuards(AccessTokenGuard)
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
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async updateTraining(
    @Param('id') id: string,
    @Body() dto: UpdateTrainingDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const coachId = req.user.sub;
    const training = await this.trainingService.updateTraining(coachId, id, dto);
    return fillObject(TrainingRdo, training);
  }

  // ВЫГРУЗКА ВИДЕО
}
