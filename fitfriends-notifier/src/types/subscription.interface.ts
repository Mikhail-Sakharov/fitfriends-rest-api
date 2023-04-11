import {Subscriber} from './subscriber.interface';

export interface Subscription {
  _id?: string;
  createdAt?: string;
  coachId: string;
  coachName: string;
  subscribers?: Subscriber[];
}
