import {Test, TestingModule} from '@nestjs/testing';
import {ReviewsService} from './reviews.service';
import {ReviewsRepository} from './reviews.repository';
import {TrainingsService} from 'src/trainings/trainings.service';

describe('ReviewsService', () => {
  let reviewsService: ReviewsService;
  const ApiTrainingsServiceProvider = {
    provide: TrainingsService,
    useFactory: () => ({
      create: jest.fn(),
      getTrainingsCatalog: jest.fn(),
      findTrainings: jest.fn(),
      showTraining: jest.fn(),
      updateTraining: jest.fn(),
      calculateRating: jest.fn(),
      setVideoFilePath: jest.fn()
    })
  };
  const ApiReviewsRepositoryProvider = {
    provide: ReviewsRepository,
    useFactory: () => ({
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn()
    })
  };

  beforeEach(async () => {
    const reviewsModule: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        ReviewsRepository,
        TrainingsService,
        ApiTrainingsServiceProvider,
        ApiReviewsRepositoryProvider
      ],
    }).compile();

    reviewsService = reviewsModule.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(reviewsService).toBeDefined();
  });
});
