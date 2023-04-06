import {Entity} from 'src/types/entity.interface';
import {Review} from 'src/types/review.interface';

export class ReviewsEntity implements Review, Entity<Review> {
  public trainingId: string;
  public userId: string;
  public userName: string;
  public userAvatarPath: string;
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
    this.userName = review.userName;
    this.userAvatarPath = review.userAvatarPath;
    this.text = review.text;
    this.rating = review.rating;
  }
}
