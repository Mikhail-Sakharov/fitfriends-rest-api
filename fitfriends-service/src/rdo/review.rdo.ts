import {Expose, Transform} from 'class-transformer';

export class ReviewRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public trainingId: string;

  @Expose()
  public userId: string;

  @Expose()
  public text: string;

  @Expose()
  public rating: number;
}
