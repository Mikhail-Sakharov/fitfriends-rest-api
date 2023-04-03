import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {fillObject} from 'common/helpers';
import {GymRdo} from 'src/rdo/gym.rdo';
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
  // СПИСОК ЗАЛОВ
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getGyms() {
    const gyms = await this.gymsService.getGyms();
    return fillObject(GymRdo, gyms);
  }
}
