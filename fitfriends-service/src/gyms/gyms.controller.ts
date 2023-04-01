import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {CreateGymDto} from 'src/dto/create-gym.dto';
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
}
