import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  RawBodyRequest,
  Req,
  UseGuards
} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import UpdateUserDto from 'src/dto/update-user.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {UserRdo} from 'src/rdo/user.rdo';
import {Payload} from 'src/types/payload.interface';
import {UsersService} from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    return await this.usersService.getFriends(userId);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The list of users is received'
  })
  // СПИСОК ПОЛЬЗОВАТЕЛЕЙ
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getUsers() {
    const users = await this.usersService.getUsers();
    return fillObject(UserRdo, users);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: "The user's info was updated"
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
    return user;
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'The detailed info is received'
  })
  // ДЕТАЛЬНАЯ ИНФ О ПОЛЬЗОВАТЕЛЕ
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getUser(@Param('id') id: string) {
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
    await this.usersService.addFriend(myId, myNewFriendId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user removed from friends'
  })
  // УДАЛИТЬ ИЗ ДРУЗЕЙ
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

  // ДОБАВИТЬ ПОКУПКУ

  // ДОБАВИТЬ ЗАЛ

  // ДОБАВЛЕНИЕ/ИЗМЕНЕНИЕ АВАТАРА
  // ----- Для процедуры аутентификации и авторизации клиент передаёт электронную почту и пароль.
}
