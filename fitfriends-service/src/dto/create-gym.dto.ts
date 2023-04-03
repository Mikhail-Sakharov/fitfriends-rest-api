import {ApiProperty} from '@nestjs/swagger';
import {ArrayMaxSize, ArrayMinSize, IsEnum, IsNumber, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';
import {GymDescriptionLength, GymPrice, GymTitleLength, GYM_FEATURES_MIN_COUNT, GYM_IMAGES_MAX_COUNT} from 'src/app.constant';
import {GymFeatures} from 'src/types/gym-features.enum';
import {SubwayStation} from 'src/types/subway-station.enum';

export class CreateGymDto {
  @ApiProperty({
    description: 'Gym title',
    example: 'World sport'
  })
  @IsString()
  @MinLength(GymTitleLength.MIN)
  @MaxLength(GymTitleLength.MAX)
  public title: string;

  @ApiProperty({
    description: 'Subway station name as the location',
    example: 'Петроградская'
  })
  @IsEnum(SubwayStation)
  public location: SubwayStation;

  @ApiProperty({
    description: 'Features the gym provides',
    example: '["бесплатная парковка"]'
  })
  @IsEnum(GymFeatures, {each: true})
  @ArrayMinSize(GYM_FEATURES_MIN_COUNT)
  public features: GymFeatures[];

  @ApiProperty({
    description: 'Images URLs',
    example: '["img/img.png"]'
  })
  @ArrayMaxSize(GYM_IMAGES_MAX_COUNT)
  public images: string[];

  @ApiProperty({
    description: 'Description',
    example: 'Огромный зал с отдельной зоной кроссфит.'
  })
  @IsString()
  @MaxLength(GymDescriptionLength.MAX)
  public description: string;

  @ApiProperty({
    description: 'Price',
    example: 1500
  })
  @IsNumber()
  @Min(GymPrice.MIN)
  @Max(GymPrice.MAX)
  public price: number;
}
