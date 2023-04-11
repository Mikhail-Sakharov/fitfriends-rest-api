import {Subscriber} from './subscriber.interface';

export interface Subscription {
  coachId: string;
  coachName: string;
  subscribers: Subscriber[];
}
