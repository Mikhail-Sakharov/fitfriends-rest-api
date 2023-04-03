import {Injectable} from '@nestjs/common';
import {CreateReviewDto} from 'src/dto/create-review.dto';
import {ReviewsEntity} from './reviews.entity';
import {ReviewsRepository} from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository
  ) {}

  public async createReview(reviewData: CreateReviewDto & {userId: string}) {
    const reviewEntity = new ReviewsEntity(reviewData);
    const review = await this.reviewsRepository.create(reviewEntity);
    return review;
  }

  public async getReviews(trainingId: string) {
    const reviews = await this.reviewsRepository.find(trainingId);
    return reviews;
  }
}
