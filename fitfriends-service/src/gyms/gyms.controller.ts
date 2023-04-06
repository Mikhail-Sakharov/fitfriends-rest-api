import {
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  RawBodyRequest,
  Req,
  UseGuards,
} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {FavoriteGymRdo} from 'src/rdo/favorite-gym.rdo';
import {GymRdo} from 'src/rdo/gym.rdo';
import {Payload} from 'src/types/payload.interface';
import {UserRole} from 'src/types/user-role.enum';
import {GymsService} from './gyms.service';

@ApiTags('gyms')
@Controller('gyms')
export class GymsController {
  constructor(
    private readonly gymsService: GymsService
  ) {}

  @ApiResponse({
    type: GymRdo,
    status: HttpStatus.OK,
    description: 'The gyms were received'
  })
  // СПИСОК ВСЕХ ЗАЛОВ
  @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getGyms() {
    const gyms = await this.gymsService.getGyms();
    return fillObject(GymRdo, gyms);
  }

  @ApiResponse({
    type: FavoriteGymRdo,
    status: HttpStatus.OK,
    description: 'The list of favorite gyms were received'
  })
  // СПИСОК ПОНРАВИВШИХСЯ ЗАЛОВ
  @UseGuards(AccessTokenGuard)
  @Get('favorites')
  @HttpCode(HttpStatus.OK)
  public async getFavoriteGyms(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for Users');
    }
    const userId = req.user.sub;
    const favoriteGyms = await this.gymsService.getFavoriteGyms(userId);
    return fillObject(FavoriteGymRdo, favoriteGyms);
  }

  @ApiResponse({
    type: FavoriteGymRdo,
    status: HttpStatus.CREATED,
    description: 'The gym was added to the favorites'
  })
  // ДОБАВИТЬ ЗАЛ В ИЗБРАННОЕ
  @UseGuards(AccessTokenGuard)
  @Get('favorites/add/:gymId')
  @HttpCode(HttpStatus.CREATED)
  public async addGymToFavorites(
    @Param('gymId') gymId: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for Users');
    }
    const userId = req.user.sub;
    const favoriteGym = await this.gymsService.addGymToFavorites(gymId, userId);
    return fillObject(FavoriteGymRdo, favoriteGym);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The gym was removed from the favorites'
  })
  // УДАЛИТЬ ЗАЛ ИЗ ИЗБРАННЫХ
  @UseGuards(AccessTokenGuard)
  @Get('favorites/remove/:gymId')
  @HttpCode(HttpStatus.OK)
  public async removeGymFromFavorites(
    @Param('gymId') gymId: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for regular Users');
    }
    const userId = req.user.sub;
    await this.gymsService.removeGymFromFavorites(gymId, userId);
  }
}
