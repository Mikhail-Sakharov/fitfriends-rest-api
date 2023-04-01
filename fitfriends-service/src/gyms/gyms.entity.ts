import {Entity} from 'src/types/entity.interface';
import {GymFeatures} from 'src/types/gym-features.enum';
import {Gym} from 'src/types/gym.interface';
import {SubwayStation} from 'src/types/subway-station.enum';

export class GymsEntity implements Gym, Entity<Gym> {
  public title: string;
  public location: SubwayStation;
  public isVerified: boolean;
  public features: GymFeatures[];
  public images: string[];
  public description: string;
  public price: number;

  constructor(gym: Gym) {
    this.fillEntity(gym);
  }

  toObject(): Gym {
    return {...this};
  }
  fillEntity(gym: Gym) {
    this.title = gym.title;
    this.location = gym.location;
    this.isVerified = gym.isVerified;
    this.features = gym.features;
    this.images = gym.images;
    this.description = gym.description;
    this.price = gym.price;
  }
}
