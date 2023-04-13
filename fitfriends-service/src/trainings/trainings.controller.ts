import {Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, Patch, Post, Query, RawBodyRequest, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import {UPLOAD_DIRECTORY_REG_EXP, VIDEO_URL_REG_EXP} from 'src/app.constant';
import {getFileInterceptorOptions} from 'src/config/multer.config';
import CreateTrainingDto from 'src/dto/create-training.dto';
import UpdateTrainingDto from 'src/dto/update-training.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {GetTrainingsQuery} from 'src/query/get-trainings.query';
import {TrainingRdo} from 'src/rdo/training.rdo';
import {Payload} from 'src/types/payload.interface';
import {TrainingsService} from './trainings.service';
import {UserRole} from 'src/types/user-role.enum';
import {GetTrainingsCatalogQuery} from 'src/query/get-trainings-catalog.query';

@ApiTags('trainings')
@Controller('trainings')
export class TrainingsController {
  constructor(
    private readonly trainingsService: TrainingsService,
    private readonly configService: ConfigService
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
    const role = req.user.userRole;
    if (role !== UserRole.Coach) {
      throw new ForbiddenException('Only for Coach');
    }
    const coachId = req.user.sub;
    const coachName = req.user.userName;
    const training = await this.trainingsService.create(coachId, coachName, dto);
    return fillObject(TrainingRdo, training);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The catalog of trainings was received'
  })
  // КАТАЛОГ ТРЕНИРОВОК
  @UseGuards(AccessTokenGuard)
  @Get('catalog')
  @HttpCode(HttpStatus.OK)
  public async getTrainingsCatalog(
    @Req() req: RawBodyRequest<{user: Payload}>,
    @Query() query: GetTrainingsCatalogQuery
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for Users');
    }
    const catalog = await this.trainingsService.getTrainingsCatalog(query);
    return fillObject(TrainingRdo, catalog);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The list of coach trainings was received'
  })
  // СПИСОК ТРЕНИРОВОК ОПРЕДЕЛЁННОГО ТРЕНЕРА
  @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getCoachTrainings(
    @Req() req: RawBodyRequest<{user: Payload}>,
    @Query() query: GetTrainingsQuery
  ) {
    const coachId = req.user.sub;
    const trainings = await this.trainingsService.findTrainings(coachId, query);
    return fillObject(TrainingRdo, trainings);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The training was received'
  })
  // ДЕТАЛЬНАЯ ИНФОРМАЦИЯ
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async showTraining(
    @Param('id') id: string
  ) {
    const training = await this.trainingsService.showTraining(id);
    return fillObject(TrainingRdo, training);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
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
    const training = await this.trainingsService.updateTraining(coachId, id, dto);
    return fillObject(TrainingRdo, training);
  }

  @ApiResponse({
    type: TrainingRdo,
    status: HttpStatus.OK,
    description: 'The training video file uploading route'
  })
  // ВЫГРУЗКА ВИДЕО
  @UseGuards(AccessTokenGuard)
  @Post('video/:id')
  @UseInterceptors(
    FileInterceptor('video', getFileInterceptorOptions())
  )
  public async uploadVideoFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: VIDEO_URL_REG_EXP,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) file: Express.Multer.File,
    @Req() req: RawBodyRequest<{user: Payload}>,
    @Param('id') id: string
  ) {
    const coachId = req.user.sub;
    const uploadDirectory = this.configService.get('multer.uploadDirectory').match(UPLOAD_DIRECTORY_REG_EXP);
    const user = this.trainingsService.setVideoFilePath(coachId, id, `${uploadDirectory}/${file.filename}`);
    return fillObject(TrainingRdo, user);
  }
}
