import {Test, TestingModule} from '@nestjs/testing';
import {RABBITMQ_SERVICE} from 'src/app.constant';
import {TrainingsService} from './trainings.service';
import {TrainingRepository} from './trainings.repository';

describe('TrainingsService', () => {
  let trainingsService: TrainingsService;
  const ApiRepositoryProvider = {
    provide: TrainingRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      findManyByCoachId: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        providers: [
          TrainingRepository,
          TrainingsService,
          ApiRepositoryProvider,
          {
            provide: RABBITMQ_SERVICE,
            useValue: {
              getResult: jest.fn(),
            },
          }
        ]
      })
      .compile();

      trainingsService = moduleRef.get<TrainingsService>(TrainingsService);
  });

  it('should be defined', () => {
    expect(trainingsService).toBeDefined();
  });
});
