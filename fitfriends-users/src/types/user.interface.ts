import {Duration} from './duration.enum';
import {Gender} from './gender.enum';
import {SubwayStation} from './subway-station.enum';
import {TrainingLevel} from './training-level.enum';
import {TrainingType} from './training-type.enum';
import {UserRole} from './user-role.enum';

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

export interface User {
  _id?: string;
  createdAt?: string;
  userName: string;
  email: string;
  avatarUrl?: string;
  password: string;
  gender: Gender;
  birthday?: string;
  userRole: UserRole;
  location: SubwayStation;
  trainingLevel: TrainingLevel;
  trainingTypes: TrainingType[];
  questionnaire: Questionnaire;
  myFriends: User[];
  myPurchases: string[]; // массив айдишников сущности
  myGyms: string[]; // массив айдишников сущности
}
