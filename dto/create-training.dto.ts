import {TrainingGenderType} from '../types/training/training-gender.enum';
import {TrainingLevel} from '../types/common/training-level.enum';
import {TrainingType} from '../types/common/training-type.enum';
import {Duration} from './create-user.dto';

export default class TrainingDto {
  public title!: string;
  public bgImageUrl!: string;
  public level!: TrainingLevel;
  public type!: TrainingType;
  public duration!: Duration;
  public price?: number;
  public caloriesCount!: number;
  public description!: string;
  public gender!: TrainingGenderType;
  public videoUrl!: string;
  public rating?: number;
  public coachId!: string;
  public isSpecialOffer!: boolean;
}
