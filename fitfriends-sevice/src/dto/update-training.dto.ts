import {Duration} from 'src/types/duration.enum';
import {TrainingGenderType} from 'src/types/training-gender.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

export default class UpdateTrainingDto {
  public title?: string;
  public level?: TrainingLevel;
  public type?: TrainingType;
  public duration?: Duration;
  public price?: number;
  public caloriesCount?: number;
  public description?: string;
  public gender?: TrainingGenderType;
  public videoUrl?: string;
  public isSpecialOffer?: boolean;
}
