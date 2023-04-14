import {Test, TestingModule} from '@nestjs/testing';
import {FoodDiaryService} from './food-diary.service';

describe('FoodDiaryService', () => {
  let service: FoodDiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodDiaryService],
    }).compile();

    service = module.get<FoodDiaryService>(FoodDiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
