import {Test, TestingModule} from '@nestjs/testing';
import {TrainingsDiaryService} from './trainings-diary.service';

describe('TrainingsDiaryService', () => {
  let service: TrainingsDiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingsDiaryService],
    }).compile();

    service = module.get<TrainingsDiaryService>(TrainingsDiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
