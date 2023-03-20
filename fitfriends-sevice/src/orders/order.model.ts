import {Document, Schema as MongooseSchema} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Order, OrderType, PaymentMethod} from 'src/types/order.interface';

@Schema({
  collection: 'fitfriends-orders',
  timestamps: true
})
export class OrderModel extends Document implements Order {
  @Prop({
    required: true
  })
  public orderType: OrderType;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'TrainingModel',
    required: true
  })
  public trainingId: string;

  @Prop({
    required: true
  })
  public price: number;

  @Prop({
    required: true
  })
  public quantity: number;

  @Prop({
    required: true
  })
  public totalOrderPrice: number;

  @Prop({
    required: true
  })
  public paymentMethod: PaymentMethod;

  @Prop({
    required: true
  })
  public coachId: string;

  @Prop({
    required: true
  })
  public traineeId: string;

  @Prop({
    default: false
  })
  public isCompleted?: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(OrderModel);
