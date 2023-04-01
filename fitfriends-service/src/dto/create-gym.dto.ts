import {GymFeatures} from 'src/types/gym-features.enum';
import {SubwayStation} from 'src/types/subway-station.enum';

export class CreateGymDto {
  public title: string; // 1 - 15 символов
  public location: SubwayStation;
  public features: GymFeatures[]; // 1 или несколько
  public images: string[]; // не более 5 фото не более 5Мб каждая jpg/png
  public description: string; // не более 140
  public price: number; // 100 - 5000
}
