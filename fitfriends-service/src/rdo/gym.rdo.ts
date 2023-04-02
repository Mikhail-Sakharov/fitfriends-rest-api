import {Expose, Transform} from 'class-transformer';
import {GymFeatures} from 'src/types/gym-features.enum';
import {SubwayStation} from 'src/types/subway-station.enum';

export class GymRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public ceatedAt: string;

  @Expose()
  public title: string;

  @Expose()
  public location: SubwayStation;

  @Expose()
  public isVerified?: boolean;

  @Expose()
  public features: GymFeatures[];

  @Expose()
  public images: string[];

  @Expose()
  public description: string;

  @Expose()
  public price: number;
}
