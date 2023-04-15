import {Test, TestingModule} from '@nestjs/testing';
import {FoodDiaryRepository} from './food-diary.repository';
import {FoodDiaryService} from './food-diary.service';

describe('FoodDiaryService', () => {
  let foodDiaryService: FoodDiaryService;
  const ApiFoodDiaryRepositoryProvider = {
    provide: FoodDiaryRepository,
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
        FoodDiaryService,
        FoodDiaryRepository,
        ApiFoodDiaryRepositoryProvider
      ],
    }).compile();

    foodDiaryService = module.get<FoodDiaryService>(FoodDiaryService);
  });

  it('should be defined', () => {
    expect(foodDiaryService).toBeDefined();
  });
});
