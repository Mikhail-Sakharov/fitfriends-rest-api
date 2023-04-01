import { Injectable } from '@nestjs/common';
import {CreateGymDto} from 'src/dto/create-gym.dto';
import {GymsEntity} from './gyms.entity';
import {GymsRepository} from './gyms.repository';

@Injectable()
export class GymsService {
  constructor(
    private readonly gymsRepository: GymsRepository
  ) {}

  public async createGym(dto: CreateGymDto) {
    const gymEntity = new GymsEntity(dto);
    return await this.gymsRepository.create(gymEntity);
  }
}
