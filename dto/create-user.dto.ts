import {Gender} from '../types/user/gender.enum';
import {SubwayStation} from '../types/common/subway-station.enum';
import {TrainingLevel} from '../types/common/training-level.enum';
import {TrainingType} from '../types/common/training-type.enum';
import {UserRole} from '../types/user/user-role.enum';

export enum Duration {
  TenToThirty = '10-30 мин',
  ThirtyToFifty = '30-50 мин',
  FiftyToEighty = '50-80 мин',
  LongerThanEighty = 'больше 80 мин'
}

type CoachQuestionnaire = {
  certificates: string[];
  description: string;
  isReadyToTrain: boolean;
};

type UserQuestionnaire = {
  trainingDuration: Duration;
  dailyCaloriesCount: number;
  totalCaloriesCount: number;
  isReadyToGetTrained: boolean;
};

export type Questionnaire = CoachQuestionnaire | UserQuestionnaire;

export default class CreateUserDto {
  public userName!: string;
  public avatarUrl!: string;
  public gender!: Gender;
  public birthday?: string;
  public userRole!: UserRole;
  public location!: SubwayStation;
  public trainingLevel!: TrainingLevel;
  public trainingTypes!: TrainingType[];
  public questionnaire!: Questionnaire;
}
