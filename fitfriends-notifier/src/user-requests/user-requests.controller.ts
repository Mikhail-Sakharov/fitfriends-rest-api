import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import {UserRequestsService} from './user-requests.service';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {Payload} from 'src/types/payload.interface';
import {fillObject} from 'common/helpers';
import {CreateUserRequestDto} from 'src/dto/create-user-request.dto';
import {UserRequestRdo} from 'src/rdo/user-request.rdo';
import {UserRole} from 'src/types/user-role.enum';
import {UpdateUserRequestDto} from 'src/dto/update-user-request.dto';

@Controller('user-requests')
export class UserRequestsController {
  constructor(
    private readonly userRequestsService: UserRequestsService
  ) {}

  // ДОБАВЛЕНИЕ ЗАЯВКИ НА ТРЕНИРОВКУ
  @UseGuards(AccessTokenGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createUserRequest(
    @Body() dto: CreateUserRequestDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for regular Users');
    }
    const initiatorId = req.user.sub;
    if (initiatorId === dto.userId) {
      throw new ConflictException('The user ID can not be equal to the initiator ID!');
    }
    const userRequest = await this.userRequestsService.createUserRequest({...dto, initiatorId});
    return fillObject(UserRequestRdo, userRequest);
  }

  // СПИСОК ЗАЯВОК
  @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getUserRequests(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const userId = req.user.sub;
    const userRequests = await this.userRequestsService.getUserRequests(userId);
    return fillObject(UserRequestRdo, userRequests);
  }

  // ИЗМЕНЕНИЕ СТАТУСА ЗАЯВКИ
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async changeUserRequestStatus(
    @Param('id') id: string,
    @Body() dto: UpdateUserRequestDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const userId = req.user.sub;
    const updatedUserRequest = await this.userRequestsService.changeUserRequestStatus(id, userId, dto);
    return fillObject(UserRequestRdo, updatedUserRequest);
  }

  // УДАЛЕНИЕ ЗАЯВКИ
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteUserRequest(
    @Param('id') id: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const userId = req.user.sub;
    await this.userRequestsService.deleteUserRequest(id, userId);
  }
}
