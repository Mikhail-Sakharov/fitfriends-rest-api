import {IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {ReviewRatingCount, ReviewTextLength} from 'src/app.constant';

export class CreateReviewDto {
  @IsMongoId()
  public trainingId: string;

  @IsString()
  @MinLength(ReviewTextLength.MIN)
  @MaxLength(ReviewTextLength.MAX)
  public text: string;

  @IsString()
  public userAvatarPath: string;

  @IsNumber()
  @Min(ReviewRatingCount.MIN)
  @Max(ReviewRatingCount.MAX)
  public rating: number;
}
