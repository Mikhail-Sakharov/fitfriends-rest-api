import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';
import {GymsModel} from 'src/gyms/gyms.model';
import {GymMembership} from 'src/types/gym-membership.interface';
import {OrderType, PaymentMethod} from 'src/types/order.interface';

@Schema({
  collection: 'gym-membership',
  timestamps: true
})
export class GymMembershipModel extends Document implements GymMembership {
  @Prop({
    default: OrderType.Gym
  })
  public orderType: OrderType;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: GymsModel.name,
    required: true
  })
  public gymId: string;

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
  public traineeId: string;

  @Prop({
    default: false
  })
  public isCompleted?: boolean;
}

export const GymMembershipSchema = SchemaFactory.createForClass(GymMembershipModel);
