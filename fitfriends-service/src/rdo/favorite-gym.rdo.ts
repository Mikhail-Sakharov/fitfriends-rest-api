import {Expose, Transform, Type} from 'class-transformer';
import {GymRdo} from './gym.rdo';

export class FavoriteGymRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public createdAt: string;

  @Expose({name: 'gymId'})
  @Type(() => GymRdo)
  public gym: GymRdo;

  @Expose()
  public userId: string;
}
