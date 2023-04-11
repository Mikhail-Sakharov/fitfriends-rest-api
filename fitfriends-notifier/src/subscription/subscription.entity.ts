import {Entity} from 'src/types/entity.interface';
import {Subscriber} from 'src/types/subscriber.interface';
import {Subscription} from 'src/types/subscription.interface';

export class SubscriptionEntity implements Subscription, Entity<Subscription> {
  public coachId: string;
  public coachName: string;
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
    this.subscribers = subscription.subscribers;
  }
}
