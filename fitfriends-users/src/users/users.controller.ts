import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch
} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import UpdateUserDto from 'src/dto/update-user.dto';
import {UserRdo} from 'src/rdo/user.rdo';
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
  @Get('friends')
  @HttpCode(HttpStatus.OK)
  public async getFriends() {
    return await this.usersService.getFriends('64119f8a4df4601762479d0c');
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
    type: UserRdo,
    status: HttpStatus.OK,
    description: "The user's info was updated"
  })
  // РЕДАКТИРОВАНИЕ ИНФ О ПОЛЬЗОВАТЕЛЕ
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto
    //@Request() req: RawBodyRequest<LoggedUser>
  ) {
    const user = await this.usersService.updateUser(id, dto);
    return user;
  }

  // ДОБАВИТЬ В ДРУЗЬЯ

  // УДАЛИТЬ ИЗ ДРУЗЕЙ (?)

  // ДОБАВИТЬ ПОКУПКУ

  // ДОБАВИТЬ ЗАЛ

  // ДОБАВЛЕНИЕ/ИЗМЕНЕНИЕ АВАТАРА
  // ----- Для процедуры аутентификации и авторизации клиент передаёт электронную почту и пароль.
}
