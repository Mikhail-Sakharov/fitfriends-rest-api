import {Document} from 'mongoose';
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {Review} from 'src/types/review.interface';

@Schema({
  collection: 'fitfriends-reviews',
  timestamps: true
})
export class ReviewsModel extends Document implements Review {
  @Prop({
    required: true
  })
  trainingId: string;

  @Prop({
    required: true
  })
  userId: string;

  @Prop({
    required: true
  })
  text: string;

  @Prop({
    required: true
  })
  rating: number;
}

export const ReviewsSchema = SchemaFactory.createForClass(ReviewsModel);
