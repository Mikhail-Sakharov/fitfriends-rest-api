import {Entity} from 'src/types/entity.interface';
import {Gender} from 'src/types/gender.enum';
import {Subscriber} from 'src/types/subscriber.interface';
import {Subscription} from 'src/types/subscription.interface';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

export class SubscriptionEntity implements Subscription, Entity<Subscription> {
  public coachId: string;
  public coachName: string;
  public coachEmail: string;
  public avatarUrl?: string;
  public gender: Gender;
  public birthday?: string;
  public location: SubwayStation;
  public trainingLevel: TrainingLevel;
  public trainingTypes: TrainingType[];
  public subscribers: Subscriber[];

  constructor(subscription: Subscription) {
    this.fillEntity(subscription);
  }

  toObject(): Subscription {
    return {...this};
  }

  fillEntity(subscription: Subscription) {
    this.coachId = subscription.coachId;
    this.coachName = subscription.coachName;
    this.coachEmail = subscription.coachEmail;
    this.avatarUrl = subscription.avatarUrl;
    this.gender = subscription.gender;
    this.birthday = subscription.birthday;
    this.location = subscription.location;
    this.trainingLevel = subscription.trainingLevel;
    this.trainingTypes = subscription.trainingTypes;
    this.subscribers = subscription.subscribers;
  }
}
