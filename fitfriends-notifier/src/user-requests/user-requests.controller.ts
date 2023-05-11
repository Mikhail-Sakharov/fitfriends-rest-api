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
import {ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('user-requests')
@Controller('user-requests')
export class UserRequestsController {
  constructor(
    private readonly userRequestsService: UserRequestsService
  ) {}

  @ApiResponse({
    type: UserRequestRdo,
    status: HttpStatus.CREATED,
    description: 'The personal training request was created'
  })
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

  @ApiResponse({
    type: UserRequestRdo,
    status: HttpStatus.OK,
    description: 'The list of incoming training requests was received'
  })
  // СПИСОК ВХОДЯЩИХ ЗАЯВОК
  @UseGuards(AccessTokenGuard)
  @Get('incoming')
  @HttpCode(HttpStatus.OK)
  public async getIncomingRequests(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const userId = req.user.sub;
    const userRequests = await this.userRequestsService.getIncomingRequests(userId);
    return fillObject(UserRequestRdo, userRequests);
  }

  @ApiResponse({
    type: UserRequestRdo,
    status: HttpStatus.OK,
    description: 'The list of incoming training requests was received'
  })
  // СПИСОК ИСХОДЯЩИХ ЗАЯВОК
  @UseGuards(AccessTokenGuard)
  @Get('outgoing')
  @HttpCode(HttpStatus.OK)
  public async getOutgoingRequests(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const userId = req.user.sub;
    const userRequests = await this.userRequestsService.getOutgoingRequests(userId);
    return fillObject(UserRequestRdo, userRequests);
  }

  @ApiResponse({
    type: UserRequestRdo,
    status: HttpStatus.OK,
    description: 'The status of personal training request was changed'
  })
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

  @ApiResponse({
    type: UserRequestRdo,
    status: HttpStatus.OK,
    description: 'The personal training request was deleted'
  })
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
