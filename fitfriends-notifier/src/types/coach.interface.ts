import {Gender} from './gender.enum';
import {SubwayStation} from './subway-station.enum';
import {TrainingLevel} from './training-level.enum';
import {TrainingType} from './training-type.enum';

export interface Coach {
  coachId: string;
  coachName: string;
  coachEmail: string;
  avatarUrl?: string;
  gender: Gender;
  birthday?: string;
  location: SubwayStation;
  trainingLevel: TrainingLevel;
  trainingTypes: TrainingType[];
}
