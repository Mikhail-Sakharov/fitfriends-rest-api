import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {fillObject} from 'common/helpers';
import {CreateGymDto} from 'src/dto/create-gym.dto';
import {GymRdo} from 'src/rdo/gym.rdo';
import {GymsService} from './gyms.service';

@Controller('gyms')
export class GymsController {
  constructor(
    private readonly gymsService: GymsService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createGym(
    @Body() dto: CreateGymDto
  ) {
    const newGym = await this.gymsService.createGym(dto);
    return newGym;
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getGyms() {
    const gyms = await this.gymsService.getGyms();
    return fillObject(GymRdo, gyms);
  }
}
