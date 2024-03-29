import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  RawBodyRequest,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {Express} from 'express';
import {fillObject} from 'common/helpers';
import UpdateUserDto from 'src/dto/update-user.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {UserRdo} from 'src/rdo/user.rdo';
import {Payload} from 'src/types/payload.interface';
import {UsersService} from './users.service';
import {ConfigService} from '@nestjs/config';
import {getFileInterceptorOptions} from 'src/config/multer.config';
import {AVATAR_MAX_SIZE, AVATAR_URL_REG_EXP, CERTIFICATE_URL_REG_EXP, UPLOAD_DIRECTORY_REG_EXP} from 'src/app.constant';
import {GetUsersQuery} from 'src/query/get-users.query';
import {DeleteCertificateQuery} from 'src/query/delete-certificate.query';
import {CoachQuestionnaire, UserQuestionnaire} from 'src/types/user.interface';
import {UserRole} from 'src/types/user-role.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The list of friends is received'
  })
  // СПИСОК ДРУЗЕЙ
  @UseGuards(AccessTokenGuard)
  @Get('friends')
  @HttpCode(HttpStatus.OK)
  public async getFriends(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const userId = req.user.sub;
    const friends = await this.usersService.getFriends(userId);
    return fillObject(UserRdo, friends);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The list of users is received'
  })
  // СПИСОК ПОЛЬЗОВАТЕЛЕЙ (КАТАЛОГ)
  @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getUsers(
    @Query() query?: GetUsersQuery
  ) {
    const users = await this.usersService.getUsers(query);
  
    if (query && query.isReadyForTraining === true) {
      const lookForCompanyUsers = users
        .filter((user) => user.userRole === UserRole.User)
        .filter((user) => (user.questionnaire as UserQuestionnaire).isReadyToGetTrained === true);

      const lookForCompanyCoaches = users
        .filter((coach) => coach.userRole === UserRole.Coach)
        .filter((coach) => (coach.questionnaire as CoachQuestionnaire).isReadyToTrain === true);

      return fillObject(UserRdo, [...lookForCompanyUsers, ...lookForCompanyCoaches]);
    }
  
    return fillObject(UserRdo, users);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The user\'s info was updated'
  })
  // РЕДАКТИРОВАНИЕ ИНФ О ПОЛЬЗОВАТЕЛЕ
  @UseGuards(AccessTokenGuard)
  @Patch('')
  @HttpCode(HttpStatus.OK)
  public async updateUser(
    @Body() dto: UpdateUserDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const id = req.user.sub;
    const user = await this.usersService.updateUser(id, dto);
    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The avatar file uploading route'
  })
  // ВЫГРУЗКА ФАЙЛА АВАТАРА
  @UseGuards(AccessTokenGuard)
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('avatar', getFileInterceptorOptions())
  )
  public async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: AVATAR_URL_REG_EXP,
        })
        .addMaxSizeValidator({
          maxSize: AVATAR_MAX_SIZE
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) file: Express.Multer.File,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const uploadDirectory = this.configService.get('multer.uploadDirectory').match(UPLOAD_DIRECTORY_REG_EXP);
    const user = this.usersService.setAvatarPath(req.user.sub, `${uploadDirectory}/${file.filename}`);
    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The certificate file uploading route'
  })
  // ВЫГРУЗКА ФАЙЛА СЕРТИФИКАТА ТРЕНЕРА
  @UseGuards(AccessTokenGuard)
  @Post('certificate')
  @UseInterceptors(
    FileInterceptor('certificate', getFileInterceptorOptions())
  )
  public async uploadCertificate(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: CERTIFICATE_URL_REG_EXP,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    ) file: Express.Multer.File,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const uploadDirectory = this.configService.get('multer.uploadDirectory').match(UPLOAD_DIRECTORY_REG_EXP);
    const user = this.usersService.setCertificateFilePath(req.user.sub, `${uploadDirectory}/${file.filename}`);
    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The certificate file deleting route'
  })
  // УДАЛЕНИЕ СЕРТИФИКАТА
  @UseGuards(AccessTokenGuard)
  @Get('certificate/delete')
  @HttpCode(HttpStatus.OK)
  public async deleteCertificate(
    @Req() req: RawBodyRequest<{user: Payload}>,
    @Query() query: DeleteCertificateQuery
  ) {
    const userId = req.user.sub;
    const certificateUrl = query.certificateUrl;
    const user = this.usersService.deleteCertificate(userId, certificateUrl);
    return fillObject(UserRdo, user);
  }


  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The detailed info is received'
  })
  // ДЕТАЛЬНАЯ ИНФ О ПОЛЬЗОВАТЕЛЕ
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getUser(
    @Param('id') id: string
  ) {
    const user = await this.usersService.getUser(id);
    return fillObject(UserRdo, user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user added in friends'
  })
  // ДОБАВИТЬ В ДРУЗЬЯ / ДОБАВИТЬСЯ В ДРУЗЬЯ
  @UseGuards(AccessTokenGuard)
  @Get('friends/add/:id')
  @HttpCode(HttpStatus.OK)
  public async addFriend(
    @Param('id') id: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const myId = req.user.sub;
    const myNewFriendId = id;
    if (myId === myNewFriendId) {
      throw new ConflictException('You can not add yourself into your friends list!');
    }
    await this.usersService.addFriend(myId, myNewFriendId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user removed from friends'
  })
  // УДАЛИТЬ ИЗ ДРУЗЕЙ / УДАЛИТЬСЯ ИЗ ДРУЗЕЙ
  @UseGuards(AccessTokenGuard)
  @Get('friends/remove/:id')
  @HttpCode(HttpStatus.OK)
  public async removeFriend(
    @Param('id') id: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const myId = req.user.sub;
    const removedFriendId = id;
    await this.usersService.removeFriend(myId, removedFriendId);
  }
}
