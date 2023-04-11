import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Subscriber} from 'src/types/subscriber.interface';
import {Subscription} from 'src/types/subscription.interface';

@Schema({
  collection: 'subscriptions',
  timestamps: true
})
export class SubscriptionModel extends Document implements Subscription {
  @Prop({
    required: true
  })
  public coachId: string;

  @Prop({
    required: true
  })
  public coachName: string;

  @Prop({
    default: []
  })
  public subscribers: Subscriber[];
}

export const SubscriptionSchema = SchemaFactory.createForClass(SubscriptionModel);
