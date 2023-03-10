import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {fillObject} from 'common/helpers';
import {AuthService} from './auth.service';
import CreateUserDto from './dto/create-user.dto';
import {UserRdo} from './rdo/user.rdo';

@Controller('users')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.appService.register(dto);
    return fillObject(UserRdo, newUser);
  }
}
