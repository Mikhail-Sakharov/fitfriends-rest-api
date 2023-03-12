import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch
} from '@nestjs/common';
import {fillObject} from 'common/helpers';
import UpdateUserDto from 'src/dto/update-user.dto';
import {UserRdo} from 'src/rdo/user.rdo';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // СПИСОК ПОЛЬЗОВАТЕЛЕЙ
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getUsers() {
    const users = await this.usersService.getUsers();
    return fillObject(UserRdo, users);
  }

  // ДЕТАЛЬНАЯ ИНФ О ПОЛЬЗОВАТЕЛЕ
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async getUser(@Param('id') id: string) {
    const user = await this.usersService.getUser(id);
    return fillObject(UserRdo, user);
  }

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

  // СПИСОК ДРУЗЕЙ

  // ДОБАВИТЬ В ДРУЗЬЯ

  // УДАЛИТЬ ИЗ ДРУЗЕЙ (?)

  // ДОБАВЛЕНИЕ/ИЗМЕНЕНИЕ АВАТАРА
  // ----- Для процедуры аутентификации и авторизации клиент передаёт электронную почту и пароль.
}
