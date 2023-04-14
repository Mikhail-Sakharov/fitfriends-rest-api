import {Test, TestingModule} from '@nestjs/testing';
import {TrainingsDiaryController} from './trainings-diary.controller';

describe('TrainingsDiaryController', () => {
  let controller: TrainingsDiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingsDiaryController],
    }).compile();

    controller = module.get<TrainingsDiaryController>(TrainingsDiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
