import {Duration} from 'src/types/duration.enum';
import {Gender} from 'src/types/gender.enum';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';

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

export default class UpdateUserDto {
  public userName?: string;
  public avatarUrl?: string;
  public gender?: Gender;
  public birthday?: string;
  public location?: SubwayStation;
  public trainingLevel?: TrainingLevel;
  public trainingTypes?: TrainingType[];
  public questionnaire?: Questionnaire;
  public refreshToken?: string | null;
}
