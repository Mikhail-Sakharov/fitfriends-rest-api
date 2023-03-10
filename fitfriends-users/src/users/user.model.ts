import {Document} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Questionnaire, User} from 'src/types/user.interface';
import {Gender} from 'src/types/gender.enum';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';
import {UserRole} from 'src/types/user-role.enum';

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
  questionnaire: Questionnaire;

  @Prop({
    default: []
  })
  myFriends: User[];

  @Prop({
    default: []
  })
  myPurchases: string[];

  @Prop({
    default: []
  })
  myGyms: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
