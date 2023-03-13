import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  RawBodyRequest,
  Req,
  UseGuards
} from '@nestjs/common';
import {fillObject} from 'common/helpers';
import {AuthService} from './auth.service';
import CreateUserDto from '../dto/create-user.dto';
import LoginUserDto from 'src/dto/login-user.dto';
import {LoggedUserRdo} from 'src/rdo/logged-user.rdo';
import {Payload} from 'src/types/payload.interface';
import {RefreshTokenGuard} from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // доступно только анонимным пользователям
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(LoggedUserRdo, newUser);
  }

  // ВХОД
  // ----- Если авторизованный клиент входит в систему,
  // сервер возвращает соответствующий код и текущий токен. Новая пара токенов не создаётся.
  // (например, сразу после регистрации)
  // ----- Войти в систему могут только анонимные клиенты
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async loginUser(@Body() dto: LoginUserDto) {
    const response = await this.authService.loginUser(dto);
    return fillObject(LoggedUserRdo, response);
  }

  // ВЫХОД
  // @UseGuards(AccessTokenGuard)

  // ОБНОВЛЕНИЕ ТОКЕНА
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshTokens(
    @Req() req: RawBodyRequest<{user: Payload & {refreshToken: string}}>
  ) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    // Logger.log(req.user);
    // форматировать ответ
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
