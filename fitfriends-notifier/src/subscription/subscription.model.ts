import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Gender} from 'src/types/gender.enum';
import {Subscriber} from 'src/types/subscriber.interface';
import {Subscription} from 'src/types/subscription.interface';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

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
    required: true
  })
  public coachEmail: string;

  @Prop({
    default: ''
  })
  public avatarUrl?: string;

  @Prop({
    required: true
  })
  public gender: Gender;

  @Prop({
    default: ''
  })
  public birthday?: string;

  @Prop({
    required: true
  })
  public location: SubwayStation;

  @Prop({
    required: true
  })
  public trainingLevel: TrainingLevel;

  @Prop({
    required: true
  })
  public trainingTypes: TrainingType[];

  @Prop({
    default: []
  })
  public subscribers: Subscriber[];
}

export const SubscriptionSchema = SchemaFactory.createForClass(SubscriptionModel);
