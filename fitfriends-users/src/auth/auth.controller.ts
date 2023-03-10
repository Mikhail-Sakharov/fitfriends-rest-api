import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {fillObject} from 'common/helpers';
import {AuthService} from './auth.service';
import CreateUserDto from './dto/create-user.dto';
import {UserRdo} from './rdo/user.rdo';

@Controller('users')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  // доступно только анонимным пользователям
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.appService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  // ВХОД
  // ----- сервер возвращает соответствующий код и текущий токен. Новая пара токенов не создаётся.
  // ----- Время жизни Access Token — 15 минут.
  // ----- Время жизни Refresh Token: 7 дней.
  // ----- Время жизни токенов может быть переназначено через переменные окружения.
  // ----- Для формирования Access Token и Refresh Token используются разные секреты.
  // ----- Секреты передаются через переменные окружения.
  // ----- Сервис предусматривает сценарий отзыва Refresh Token. (?)

  // ДЕТАЛЬНАЯ ИНФ О ПОЛЬЗОВАТЕЛЕ

  // РЕДАКТИРОВАНИЕ ИНФ О ПОЛЬЗОВАТЕЛЕ

  // СПИСОК ПОЛЬЗОВАТЕЛЕЙ

  // СПИСОК ДРУЗЕЙ

  // ДОБАВИТЬ В ДРУЗЬЯ

  // УДАЛИТЬ ИЗ ДРУЗЕЙ (?)

  // ДОБАВЛЕНИЕ/ИЗМЕНЕНИЕ АВАТАРА
  // ----- Для процедуры аутентификации и авторизации клиент передаёт электронную почту и пароль.
}
