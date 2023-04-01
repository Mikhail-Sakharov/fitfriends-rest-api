import {GymFeatures} from './gym-features.enum';
import {SubwayStation} from './subway-station.enum';

export interface Gym {
  _id?: string;
  createdAt?: string;
  title: string; // 1 - 15 символов
  location: SubwayStation;
  isVerified?: boolean;
  features: GymFeatures[]; // 1 или несколько
  images: string[]; // не более 5 фото не более 5Мб каждая jpg/png
  description: string; // не более 140
  price: number; // 100 - 5000
}
