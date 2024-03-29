import {Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Post, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import {CreateTrainingsDiaryDto} from 'src/dto/create-trainings-diary.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {TrainingsDiaryRdo} from 'src/rdo/trainings-diary.rdo';
import {Payload} from 'src/types/payload.interface';
import {UserRole} from 'src/types/user-role.enum';
import {TrainingsDiaryService} from './trainings-diary.service';

@ApiTags('trainings-diary')
@Controller('trainings-diary')
export class TrainingsDiaryController {
  constructor(
    private readonly trainingsDiaryService: TrainingsDiaryService
  ) {}

  @ApiResponse({
    type: TrainingsDiaryRdo,
    status: HttpStatus.CREATED,
    description: 'The training diary was created'
  })
  // СОЗДАНИЕ ДНЕВНИКА ТРЕНИРОВОК
  @UseGuards(AccessTokenGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createTrainingsDiary(
    @Body() dto: CreateTrainingsDiaryDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for regular Users');
    }
    const userId = req.user.sub;
    const trainingsDiary = await this.trainingsDiaryService.createTrainingsDiary({...dto, userId});
    return fillObject(TrainingsDiaryRdo, trainingsDiary);
  }

  @ApiResponse({
    type: TrainingsDiaryRdo,
    status: HttpStatus.OK,
    description: 'The training diary list was received'
  })
  // ЗАПРОС СПИСКА ТРЕНИРОВОК
  @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getTrainingsDiaries(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    // TODO: При состыковке с клиентской частью:
    // - отфильтровать записи с датой не ранее ПН текущей недели
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for regular Users');
    }
    const userId = req.user.sub;
    const trainingsDiaries = await this.trainingsDiaryService.getTrainingsDiaries(userId);
    return fillObject(TrainingsDiaryRdo, trainingsDiaries);
  }
}
