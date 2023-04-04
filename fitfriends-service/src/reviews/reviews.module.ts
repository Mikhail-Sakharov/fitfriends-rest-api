import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ReviewsModel, ReviewsSchema} from './reviews.model';
import {ReviewsRepository} from './reviews.repository';
import {ReviewsController} from './reviews.controller';
import {ReviewsService} from './reviews.service';
import {TrainingsModule} from 'src/trainings/trainings.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: ReviewsModel.name, schema: ReviewsSchema}
    ]),
    TrainingsModule
  ],
  providers: [ReviewsRepository, ReviewsService],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
