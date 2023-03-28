import {Body, Controller, Get, HttpCode, HttpStatus, Post, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {fillObject} from 'common/helpers';
import {CreateTrainingsDiaryDto} from 'src/dto/create-trainings-diary.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {TrainingsDiaryRdo} from 'src/rdo/trainings-diary.rdo';
import {Payload} from 'src/types/payload.interface';
import {TrainingsDiaryService} from './trainings-diary.service';

@Controller('trainings-diary')
export class TrainingsDiaryController {
  constructor(
    private readonly trainingsDiaryService: TrainingsDiaryService
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createTrainingsDiary(
    @Body() dto: CreateTrainingsDiaryDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const userId = req.user.sub;
    const trainingsDiary = await this.trainingsDiaryService.createTrainingsDiary({...dto, userId});
    return fillObject(TrainingsDiaryRdo, trainingsDiary);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getTrainingsDiaries() {
    const trainingsDiaries = await this.trainingsDiaryService.getTrainingsDiaries();
    return fillObject(TrainingsDiaryRdo, trainingsDiaries);
  }
}
