import {ConflictException, ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {SEEDING_GYMS_MAX_COUNT} from 'src/app.constant';
import {CreateGymDto} from 'src/dto/create-gym.dto';
import {Gym} from 'src/types/gym.interface';
import {FavoriteGymsEntity} from './favorite-gyms.entity';
import {FavoriteGymsRepository} from './favorite-gyms.repository';
import {GymsEntity} from './gyms.entity';
import {GymsRepository} from './gyms.repository';
import {GetGymsQuery} from 'src/query/get-gyms.query';

@Injectable()
export class GymsService {
  constructor(
    private readonly gymsRepository: GymsRepository,
    private readonly favoriteGymsRepository: FavoriteGymsRepository
  ) {}

  public async createGym(dto: CreateGymDto) {
    const gymEntity = new GymsEntity(dto);
    return await this.gymsRepository.create(gymEntity);
  }

  public async getGyms() {
    const gyms = await this.gymsRepository.find();
    return gyms;
  }

  public async getCatalog(query: GetGymsQuery) {
    const gyms = await this.gymsRepository.getCatalog(query);
    return gyms;
  }

  public async addGymToFavorites(gymId: string, userId: string) {
    const favoriteGyms = await this.getFavoriteGyms(userId);
    const isAlreadyInFavorites = favoriteGyms.some((gym) => ((gym.gymId as unknown) as Gym)._id.toString() === gymId);
    if (isAlreadyInFavorites) {
      throw new ForbiddenException('This gym is already in the favorites');
    }
    const favoriteGymsEntity = new FavoriteGymsEntity({gymId, userId});
    return await this.favoriteGymsRepository.create(favoriteGymsEntity);
  }

  public async removeGymFromFavorites(gymId: string, userId: string) {
    const favoriteGyms = await this.getFavoriteGyms(userId);
    const favoriteGym = favoriteGyms.find((gym) => ((gym.gymId as unknown) as Gym)._id.toString() === gymId);
    if (!favoriteGym) {
      throw new NotFoundException('Gym is not found in the favorites');
    }
    const favoriteGymUserId = favoriteGym.userId
    if (favoriteGymUserId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    const favoriteGymEntityId = favoriteGym._id;
    await this.favoriteGymsRepository.destroy(favoriteGymEntityId);
  }

  public async getFavoriteGyms(userId: string) {
    return await this.favoriteGymsRepository.find(userId);
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
