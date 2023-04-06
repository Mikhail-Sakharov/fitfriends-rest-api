import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ReviewsModel, ReviewsSchema} from './reviews.model';
import {ReviewsRepository} from './reviews.repository';
import {ReviewsController} from './reviews.controller';
import {ReviewsService} from './reviews.service';
import {TrainingsModule} from 'src/trainings/trainings.module';
import {JwtModule} from '@nestjs/jwt';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {name: ReviewsModel.name, schema: ReviewsSchema}
    ]),
    TrainingsModule
  ],
  providers: [ReviewsRepository, ReviewsService, AccessTokenStrategy],
  controllers: [ReviewsController]
})
export class ReviewsModule {}
