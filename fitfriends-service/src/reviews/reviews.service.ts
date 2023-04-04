import {Injectable} from '@nestjs/common';
import {CreateReviewDto} from 'src/dto/create-review.dto';
import {ReviewsEntity} from './reviews.entity';
import {ReviewsRepository} from './reviews.repository';
import {TrainingsService} from 'src/trainings/trainings.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly trainingsService: TrainingsService
  ) {}

  public async createReview(reviewData: CreateReviewDto & {userId: string}) {
    const reviewEntity = new ReviewsEntity(reviewData);

    const trainingId = reviewData.trainingId;
    const currentReviewRating = reviewData.rating;
    const currentReviewsCount = (await this.getReviews(trainingId)).length;

    const review = await this.reviewsRepository.create(reviewEntity);
    await this.trainingsService.incrementRating(trainingId, currentReviewRating, currentReviewsCount);

    return review;
  }

  public async getReviews(trainingId: string) {
    const reviews = await this.reviewsRepository.find(trainingId);
    return reviews;
  }
}
