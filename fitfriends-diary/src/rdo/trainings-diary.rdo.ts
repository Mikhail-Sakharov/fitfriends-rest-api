import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform} from 'class-transformer';

export class TrainingsDiaryRdo {
  @ApiProperty({
    description: 'The unique MongoDB ID',
    example: '6410a7b666d4c557792f0382'
  })
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'The date of the diary entry creation',
    example: '2023-03-14T16:58:30.805Z'
  })
  @Expose()
  public createdAt: string;  

  @ApiProperty({
    description: 'The Mongo ID of the respective training in the DB',
    example: '64174be02541b3f1599b4cc2'
  })
  @Expose()
  public trainingId: string;

  @ApiProperty({
    description: 'Training title',
    example: 'energy'
  })
  @Expose()
  public trainingTitle: string;

  @ApiProperty({
    description: 'The unique MongoDB ID of the user who has created the diary',
    example: '6410a7b666d4c557792f0383'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Training calories number to burn',
    example: 1500
  })
  @Expose()
  public caloriesCount: number;

  @ApiProperty({
    description: 'Training duration',
    example: 10
  })
  @Expose()
  public duration: number;
}
