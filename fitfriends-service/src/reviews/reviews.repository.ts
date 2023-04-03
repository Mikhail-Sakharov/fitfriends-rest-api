import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {Review} from 'src/types/review.interface';
import {ReviewsEntity} from './reviews.entity';
import {ReviewsModel} from './reviews.model';

export class ReviewsRepository implements CRUDRepository<ReviewsEntity, string, Review> {
  constructor(
    @InjectModel(ReviewsModel.name) private readonly reviewModel: Model<ReviewsModel>
  ) {}

  public async create(item: ReviewsEntity): Promise<Review> {
    const newReviews = await this.reviewModel.create(item.toObject());
    return newReviews;
  }

  public async find(trainingId: string): Promise<Review[]> {
    return await this.reviewModel.find({trainingId});
  }

  public async findById(id: string): Promise<Review | null> {
    return await this.reviewModel.findById(id);
  }

  public async update(id: string, item: ReviewsEntity): Promise<Review> {
    return await this.reviewModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return await this.reviewModel.findByIdAndDelete(id);
  }
}
