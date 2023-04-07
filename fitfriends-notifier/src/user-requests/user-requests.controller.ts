import {Body, Controller, HttpCode, HttpStatus, Post, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {UserRequestsService} from './user-requests.service';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {Payload} from 'src/types/payload.interface';
import {fillObject} from 'common/helpers';
import {CreateUserRequestDto} from 'src/dto/create-user-request.dto';
import {UserRequestRdo} from 'src/rdo/user-request.rdo';

@Controller('user-requests')
export class UserRequestsController {
  constructor(
    private readonly userRequestsService: UserRequestsService
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createUserRequest(
    @Body() dto: CreateUserRequestDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const userId = req.user.sub;
    const userRequest = await this.userRequestsService.createUserRequest({...dto, userId});
    return fillObject(UserRequestRdo, userRequest);
  }
}
