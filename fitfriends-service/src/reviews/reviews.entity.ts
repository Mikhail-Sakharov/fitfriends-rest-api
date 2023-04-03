import {Entity} from 'src/types/entity.interface';
import {Review} from 'src/types/review.interface';

export class ReviewsEntity implements Review, Entity<Review> {
  public trainingId: string;
  public userId: string;
  public text: string;
  public rating: number;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  toObject(): Review {
    return {...this};
  }

  fillEntity(review: Review) {
    this.trainingId = review.trainingId;
    this.userId = review.userId;
    this.text = review.text;
    this.rating = review.rating;
  }
}
