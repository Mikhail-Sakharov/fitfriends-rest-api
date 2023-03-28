import {Expose, Transform} from 'class-transformer';

export class TrainingsDiaryRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public createdAt: string[];  

  @Expose()
  public trainingId: string;

  @Expose()
  public trainingTitle: string;

  @Expose()
  public userId: string;

  @Expose()
  public caloriesCount: number;

  @Expose()
  public duration: number;
}
