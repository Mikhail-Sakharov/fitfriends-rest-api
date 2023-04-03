import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ReviewsModel, ReviewsSchema} from './reviews.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: ReviewsModel.name, schema: ReviewsSchema}
    ])
  ]
})
export class ReviewsModule {}
