import {Test, TestingModule} from '@nestjs/testing';
import {TrainingsDiaryService} from './trainings-diary.service';
import {TrainingsDiaryRepository} from './trainings-diary.repository';

describe('TrainingsDiaryService', () => {
  let trainingsDiaryService: TrainingsDiaryService;
  const ApiTrainingsDiaryRepositoryProvider = {
    provide: TrainingsDiaryRepository,
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
        TrainingsDiaryService,
        TrainingsDiaryRepository,
        ApiTrainingsDiaryRepositoryProvider
      ],
    }).compile();

    trainingsDiaryService = module.get<TrainingsDiaryService>(TrainingsDiaryService);
  });

  it('should be defined', () => {
    expect(trainingsDiaryService).toBeDefined();
  });
});
