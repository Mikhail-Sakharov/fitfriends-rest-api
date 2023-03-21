import {Expose, Transform, Type} from 'class-transformer';
import {OrderType, PaymentMethod} from 'src/types/order.interface';
import {TrainingRdo} from './training.rdo';

export class OrderRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public orderType: OrderType;

  @Expose({name: 'trainingId'})
  @Type(() => TrainingRdo)
  public training: string;

  @Expose()
  public price: number;

  @Expose()
  public quantity: number;

  @Expose()
  public totalOrderPrice: number;

  @Expose()
  public paymentMethod: PaymentMethod;

  @Expose()
  public coachId: string;

  @Expose()
  public traineeId: string;

  @Expose()
  public isCompleted: boolean;
}
