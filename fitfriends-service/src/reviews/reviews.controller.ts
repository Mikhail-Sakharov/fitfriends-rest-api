import {Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Param, Post, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {CreateReviewDto} from 'src/dto/create-review.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {Payload} from 'src/types/payload.interface';
import {UserRole} from 'src/types/user-role.enum';
import {ReviewsService} from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService
  ) {}

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
    // пересчитать рейтинг тренировки
    const userId = req.user.sub;
    const review = await this.reviewsService.createReview({...dto, userId});
    // добавить RDO
    return review;
  }

  // ЗАПРОС ОТЗЫВОВ О ТРЕНИРОВКЕ
  @UseGuards(AccessTokenGuard)
  @Get(':trainingId')
  @HttpCode(HttpStatus.OK)
  public async getReviews(
    @Param('trainingId') trainingId: string
  ) {
    const reviews = await this.reviewsService.getReviews(trainingId);
    // добавить RDO
    return reviews;
  }
}
