import {GymFeatures} from './gym-features.enum';
import {SubwayStation} from './subway-station.enum';

export interface Gym {
  _id?: string;
  createdAt?: string;
  title: string;
  location: SubwayStation;
  isVerified?: boolean;
  features: GymFeatures[];
  images: string[];
  description: string;
  price: number;
}
