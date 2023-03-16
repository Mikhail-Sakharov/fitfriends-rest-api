import {Expose} from 'class-transformer';
import {Duration} from 'src/types/duration.enum';
import {TrainingGenderType} from 'src/types/training-gender.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

export class TrainingRdo {
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public createdAt: string[];

  @Expose()
  public title!: string;

  @Expose()
  public bgImageUrl!: string;

  @Expose()
  public level!: TrainingLevel;

  @Expose()
  public type!: TrainingType;

  @Expose()
  public duration!: Duration;

  @Expose()
  public price?: number;

  @Expose()
  public caloriesCount!: number;

  @Expose()
  public description!: string;

  @Expose()
  public gender!: TrainingGenderType;

  @Expose()
  public videoUrl!: string;

  @Expose()
  public rating?: number;

  @Expose()
  public coachId!: string;

  @Expose()
  public isSpecialOffer!: boolean;
}
