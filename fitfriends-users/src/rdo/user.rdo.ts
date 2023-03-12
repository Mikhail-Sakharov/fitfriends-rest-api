import {Transform, Expose} from 'class-transformer';
import {Gender} from 'src/types/gender.enum';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';
import {UserRole} from 'src/types/user-role.enum';
import {User} from 'src/types/user.interface';
import {Questionnaire} from '../dto/create-user.dto';

export class UserRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public createdAt: string[];

  @Expose()
  public userName: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarUrl: string;

  @Expose()
  public gender: Gender;

  @Expose()
  public birthday: string;

  @Expose()
  public userRole: UserRole;

  @Expose()
  public location: SubwayStation;

  @Expose()
  public trainingLevel: TrainingLevel;

  @Expose()
  public trainingTypes: TrainingType[];

  @Expose()
  public questionnaire: Questionnaire;

  @Expose()
  public myFriends: User[];

  @Expose()
  public myPurchases: string[];

  @Expose()
  public myGyms: string[];
}
