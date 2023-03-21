import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';
import {Duration} from 'src/types/duration.enum';
import {TrainingGenderType} from 'src/types/training-gender.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

export class TrainingRdo {
  @ApiProperty({
    description: 'The unique MongoDB ID',
    example: '6410a7b666d4c557792f0382'
  })
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'The date of the training entry creation',
    example: '2023-03-14T16:58:30.805Z'
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Training title',
    example: 'energy'
  })
  @Expose()
  public title!: string;

  @ApiProperty({
    description: 'Training background image',
    example: 'img/content/thumbnails/training-02.jpg'
  })
  @Expose()
  public bgImageUrl!: string;

  @ApiProperty({
    description: 'User\'s training level',
    example: 'любитель'
  })
  @Expose()
  public level!: TrainingLevel;

  @ApiProperty({
    description: 'Type of training',
    example: 'стрейчинг'
  })
  @Expose()
  public type!: TrainingType;

  @ApiProperty({
    description: 'Training duration',
    example: '30-50 мин'
  })
  @Expose()
  public duration!: Duration;

  @ApiProperty({
    description: 'Training price',
    example: 1500
  })
  @Expose()
  public price?: number;

  @ApiProperty({
    description: 'Training calories number to burn',
    example: 1500
  })
  @Expose()
  public caloriesCount!: number;

  @ApiProperty({
    description: 'Training description text',
    example: 'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.'
  })
  @Expose()
  public description!: string;

  @ApiProperty({
    description: 'What gender the training is destined for',
    example: 'для всех'
  })
  @Expose()
  public gender!: TrainingGenderType;

  @ApiProperty({
    description: 'Training video URL',
    example: 'videos/0q3874yr-4q3rq3-q34r-erq74.mp4'
  })
  @Expose()
  public videoUrl!: string;

  @ApiProperty({
    description: 'Training raiting',
    example: 5
  })
  @Expose()
  public rating?: number;

  @ApiProperty({
    description: 'The coach MongoDB ID',
    example: '6411af71fba5eba2ef3f7bc0'
  })
  @Expose()
  public coachId!: string;

  @ApiProperty({
    description: 'Indicates if the training is special offer',
    example: true
  })
  @Expose()
  public isSpecialOffer!: boolean;
}
