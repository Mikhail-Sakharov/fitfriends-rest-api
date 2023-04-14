import {Test, TestingModule} from '@nestjs/testing';
import {FoodDiaryController} from './food-diary.controller';

describe('FoodDiaryController', () => {
  let controller: FoodDiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodDiaryController],
    }).compile();

    controller = module.get<FoodDiaryController>(FoodDiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
