import {Duration} from 'src/types/duration.enum';
import {Gender} from 'src/types/gender.enum';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';
import {UserRole} from 'src/types/user-role.enum';

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
  public email!: string;
  public avatarUrl?: string;
  public password!: string;
  public gender!: Gender;
  public birthday?: string;
  public userRole!: UserRole;
  public location!: SubwayStation;
  public trainingLevel!: TrainingLevel;
  public trainingTypes!: TrainingType[];
  public questionnaire!: Questionnaire;
}
