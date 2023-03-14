import {
  Body,
  Controller,
  ForbiddenException,
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
import {AccessTokenGuard} from './guards/access-token.guard';
import {ApiBody, ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: CreateUserDto
  })
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.CREATED,
    description: 'A user has been signed up'
  })
  // РЕГИСТРАЦИЯ
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateUserDto,
    @Req() req: RawBodyRequest<{headers: {authorization: string}}>
  ) {
    if (req.headers.authorization) {
      throw new ForbiddenException('Access Denied');
    }
    const newUser = await this.authService.register(dto);
    return fillObject(LoggedUserRdo, newUser);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'The user is signed in'
  })
  // ВХОД
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async loginUser(
    @Body() dto: LoginUserDto,
    @Req() req: RawBodyRequest<{headers: {authorization: string}}>
  ) {
    if (req.headers.authorization) {
      throw new ForbiddenException('Access Denied');
    }
    const response = await this.authService.loginUser(dto);
    return fillObject(LoggedUserRdo, response);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been logged out'
  })
  // ВЫХОД
  // ----- на стороне клиента удаляем accessToken из localStorage
  // ----- на сервере удаляем из БД refreshToken
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Req() req: RawBodyRequest<{user: Payload & {refreshToken: string}}>
  ) {
    const userId = req.user.sub;
    await this.authService.logout(userId);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'A new pair of tokens is received'
  })
  // ОБНОВЛЕНИЕ ТОКЕНА
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshTokens(
    @Req() req: RawBodyRequest<{user: Payload & {refreshToken: string}}>
  ) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    const response = this.authService.refreshTokens(userId, refreshToken);
    return fillObject(LoggedUserRdo, response);
  }
}
