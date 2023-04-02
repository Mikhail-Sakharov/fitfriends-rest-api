import {ConflictException, Injectable} from '@nestjs/common';
import {SEEDING_GYMS_MAX_COUNT} from 'src/app.constant';
import {CreateGymDto} from 'src/dto/create-gym.dto';
import {Gym} from 'src/types/gym.interface';
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

  public async getGyms() {
    const gyms = await this.gymsRepository.find();
    return gyms;
  }

  public async seed(gyms: Gym[]) {
    const gymsInDB = await this.getGyms();
    const gymsCurrentCount = gymsInDB.length;
    const gymsSeedingCount = gyms.length;

    if (gymsCurrentCount >= SEEDING_GYMS_MAX_COUNT || gymsSeedingCount > SEEDING_GYMS_MAX_COUNT) {
      throw new ConflictException('Database overflow detected!');
    }

    const additionalGyms = gyms.slice(0, SEEDING_GYMS_MAX_COUNT - gymsCurrentCount);
    const gymEntities = additionalGyms.map((gym) => new GymsEntity(gym));
    return await this.gymsRepository.seed(gymEntities);
  }
}
