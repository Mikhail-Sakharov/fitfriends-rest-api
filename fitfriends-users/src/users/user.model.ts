import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {User} from 'src/types/user.interface';
import {Gender} from 'src/types/gender.enum';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';
import {UserRole} from 'src/types/user-role.enum';
import {Duration} from 'src/types/duration.enum';

class CoachQuestionnaire {
  certificates: string[];
  description: string;
  isReadyToTrain: boolean;
}

class UserQuestionnaire {
  trainingDuration: Duration;
  dailyCaloriesCount: number;
  totalCaloriesCount: number;
  isReadyToGetTrained: boolean;
}

class Questionnaire implements CoachQuestionnaire, UserQuestionnaire {
  trainingDuration: Duration;
  dailyCaloriesCount: number;
  totalCaloriesCount: number;
  isReadyToGetTrained: boolean;
  certificates: string[];
  description: string;
  isReadyToTrain: boolean;
}

@Schema({
  collection: 'users',
  timestamps: true
})
export class UserModel extends Document implements User {
  @Prop({
    required: true
  })
  userName: string;

  @Prop({
    required: true,
    unique: true
  })
  email: string;

  @Prop()
  avatarUrl?: string;

  @Prop({
    required: true
  })
  passwordHash: string;

  @Prop({
    required: true
  })
  gender: Gender;

  @Prop()
  birthday?: string;

  @Prop({
    required: true
  })
  userRole: UserRole;

  @Prop({
    required: true
  })
  location: SubwayStation;

  @Prop({
    required: true
  })
  trainingLevel: TrainingLevel;

  @Prop({
    required: true
  })
  trainingTypes: TrainingType[];

  @Prop({
    required: true
  })
  questionnaire: Questionnaire; // нужен union type

  @Prop({
    default: []
  })
  myFriends: string[];

  @Prop({
    default: null
  })
  refreshToken: string | null;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
