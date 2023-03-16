import {Duration} from 'src/types/duration.enum';
import {TrainingGenderType} from 'src/types/training-gender.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

export default class CreateTrainingDto {
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
