import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';
import {GymFeatures} from 'src/types/gym-features.enum';
import {SubwayStation} from 'src/types/subway-station.enum';

export class GymRdo {
  @ApiProperty({
    description: 'The unique MongoDB ID',
    example: '6410a7b666d4c557792f0382'
  })
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'The date of the order entry creation',
    example: '2023-03-14T16:58:30.805Z'
  })
  @Expose()
  public ceatedAt: string;

  @ApiProperty({
    description: 'Gym title',
    example: 'World sport'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Subway station name as the location',
    example: 'Петроградская'
  })
  @Expose()
  public location: SubwayStation;

  @ApiProperty({
    description: 'Indicates whether the gym verified or not',
    example: true
  })
  @Expose()
  public isVerified?: boolean;

  @ApiProperty({
    description: 'Features the gym provides',
    example: '["бесплатная парковка"]'
  })
  @Expose()
  public features: GymFeatures[];

  @ApiProperty({
    description: 'Images URLs',
    example: '["img/img.png"]'
  })
  @Expose()
  public images: string[];

  @ApiProperty({
    description: 'Description',
    example: 'Огромный зал с отдельной зоной кроссфит.'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Price',
    example: 1500
  })
  @Expose()
  public price: number;
}
