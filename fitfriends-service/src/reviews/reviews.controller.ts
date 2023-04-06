import {Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Param, Post, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {CreateReviewDto} from 'src/dto/create-review.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {Payload} from 'src/types/payload.interface';
import {UserRole} from 'src/types/user-role.enum';
import {ReviewsService} from './reviews.service';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {ReviewRdo} from 'src/rdo/review.rdo';
import {fillObject} from 'common/helpers';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService
  ) {}

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.CREATED,
    description: 'The review was created'
  })
  // ДОБАВЛЕНИЕ ОТЗЫВА
  @UseGuards(AccessTokenGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  public async createReview(
    @Body() dto: CreateReviewDto,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const role = req.user.userRole;
    if (role !== UserRole.User) {
      throw new ForbiddenException('Only for regular Users');
    }
    const userId = req.user.sub;
    const userName = req.user.userName;
    const review = await this.reviewsService.createReview({...dto, userId, userName});
    return fillObject(ReviewRdo, review);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatus.OK,
    description: 'The list of reviews was received'
  })
  // ЗАПРОС ОТЗЫВОВ О ТРЕНИРОВКЕ
  @UseGuards(AccessTokenGuard)
  @Get(':trainingId')
  @HttpCode(HttpStatus.OK)
  public async getReviews(
    @Param('trainingId') trainingId: string
  ) {
    const reviews = await this.reviewsService.getReviews(trainingId);
    return fillObject(ReviewRdo, reviews);
  }
}
