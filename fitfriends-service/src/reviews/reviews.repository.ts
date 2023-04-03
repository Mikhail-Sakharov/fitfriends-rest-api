import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CRUDRepository} from 'src/types/crud-repository.interface';
import {Review} from 'src/types/review.interface';
import {ReviewsEntity} from './reviews.entity';
import {ReviewsModel} from './reviews.model';

export class ReviewsRepository implements CRUDRepository<ReviewsEntity, string, Review> {
  constructor(
    @InjectModel(ReviewsModel.name) private readonly trainingModel: Model<ReviewsModel>
  ) {}

  findById(id: string): Promise<Review> {
    throw new Error('Method not implemented.');
  }

  create(item: ReviewsEntity): Promise<Review> {
    throw new Error('Method not implemented.');
  }

  update(id: string, item: ReviewsEntity): Promise<Review> {
    throw new Error('Method not implemented.');
  }

  destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
