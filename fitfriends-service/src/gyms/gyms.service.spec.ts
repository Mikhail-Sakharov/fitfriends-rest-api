import {Test, TestingModule} from '@nestjs/testing';
import {GymsRepository} from './gyms.repository';
import {FavoriteGymsRepository} from './favorite-gyms.repository';
import {GymsService} from './gyms.service';

describe('GymsService', () => {
  let gymsService: GymsService;
  const ApiGymsRepositoryProvider = {
    provide: GymsRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      getTrainingPurchases: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };
  const ApiFavoriteGymsRepositoryProvider = {
    provide: FavoriteGymsRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GymsService,
        GymsRepository,
        FavoriteGymsRepository,
        ApiGymsRepositoryProvider,
        ApiFavoriteGymsRepositoryProvider
      ],
    }).compile();

    gymsService = module.get<GymsService>(GymsService);
  });

  it('should be defined', () => {
    expect(gymsService).toBeDefined();
  });
});
