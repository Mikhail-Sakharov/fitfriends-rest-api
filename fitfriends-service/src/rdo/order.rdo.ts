import {ApiProperty} from '@nestjs/swagger';
import {Expose, Transform, Type} from 'class-transformer';
import {OrderType, PaymentMethod} from 'src/types/order.interface';
import {TrainingRdo} from './training.rdo';

export class OrderRdo {
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
  public createdAt: string;

  @ApiProperty({
    description: 'The type of the order',
    example: 'тренировка'
  })
  @Expose()
  public orderType: OrderType;

  @ApiProperty({
    description: 'The Mongo ID of the respective training in the DB',
    example: '64174be02541b3f1599b4cc2'
  })
  @Expose({name: 'trainingId'})
  @Type(() => TrainingRdo)
  public training: string;

  @ApiProperty({
    description: 'The price of the selected training',
    example: 2000
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'The number of the selected trainings',
    example: 2
  })
  @Expose()
  public quantity: number;

  @ApiProperty({
    description: 'The total price of the order',
    example: 4000
  })
  @Expose()
  public totalOrderPrice: number;

  @ApiProperty({
    description: 'The payment methode a user selected',
    example: 'visa'
  })
  @Expose()
  public paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'The unique MongoDB ID of the coach',
    example: '6410a7b666d4c557792f0382'
  })
  @Expose()
  public coachId: string;

  @ApiProperty({
    description: 'The unique MongoDB ID of the user who has made the order',
    example: '6410a7b666d4c557792f0383'
  })
  @Expose()
  public traineeId: string;

  @ApiProperty({
    description: 'Indicates if the order was completed',
    example: true
  })
  @Expose()
  public isCompleted: boolean;
}
