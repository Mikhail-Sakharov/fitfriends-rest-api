import {Test, TestingModule} from '@nestjs/testing';
import {ReviewsService} from './reviews.service';
import {ReviewsController} from './reviews.controller';
import {CreateReviewDto} from 'src/dto/create-review.dto';
import {UserRole} from 'src/types/user-role.enum';

describe('ReviewsController', () => {
  let reviewsController: ReviewsController;
  let reviewsService: ReviewsService;
  const ApiServiceProvider = {
    provide: ReviewsService,
    useFactory: () => ({
      createReview: jest.fn(),
      getReviews: jest.fn()
    })
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
        controllers: [ReviewsController],
        providers: [
          ReviewsService,
          ApiServiceProvider
        ]
      })
      .compile();

    reviewsController = moduleRef.get<ReviewsController>(ReviewsController);
    reviewsService = moduleRef.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(reviewsController).toBeDefined();
  });

  it("calling createReview method", () => {
    const dto = new CreateReviewDto();
    const req = {user: {
      sub: '',
      userName: '',
      userRole: UserRole.User,
      email: ''
    }};

    reviewsController.createReview(dto, req);
    expect(reviewsService.createReview).toHaveBeenCalled();
  });

  it("calling getReviews method", () => {
    const id = '';

    reviewsController.getReviews(id);
    expect(reviewsService.getReviews).toHaveBeenCalled();
  });
});
