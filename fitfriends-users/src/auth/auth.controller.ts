import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {fillObject} from 'common/helpers';
import {AuthService} from './auth.service';
import CreateUserDto from '../dto/create-user.dto';
import {UserRdo} from '../rdo/user.rdo';
import LoginUserDto from 'src/dto/login-user.dto';
import {LoggedUserRdo} from 'src/rdo/logged-user.rdo';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // доступно только анонимным пользователям
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
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
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body() dto: LoginUserDto) {
    const response = await this.authService.loginUser(dto);
    return fillObject(LoggedUserRdo, response);
  }

  // ВЫХОД

  // ОБНОВЛЕНИЕ ТОКЕНА
}
