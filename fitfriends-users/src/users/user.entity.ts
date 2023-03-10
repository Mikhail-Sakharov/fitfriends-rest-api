import {genSalt, hash, compare} from 'bcrypt';
import {Entity} from 'src/types/entity.interface';
import {Gender} from 'src/types/gender.enum';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';
import {UserRole} from 'src/types/user-role.enum';
import {Questionnaire, User} from 'src/types/user.interface';

const SALT_ROUNDS = 10;

export class UserEntity implements User, Entity<User> {
  public userName: string;
  public email: string;
  public avatarUrl?: string;
  public passwordHash: string;
  public gender: Gender;
  public birthday?: string;
  public userRole: UserRole;
  public location: SubwayStation;
  public trainingLevel: TrainingLevel;
  public trainingTypes: TrainingType[];
  public questionnaire: Questionnaire;
  public myFriends?: User[];
  public myPurchases?: string[];
  public myGyms?: string[];

  constructor(user: User) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(user: User) {
    this.userName = user.userName;
    this.email = user.email;
    this.avatarUrl = user.avatarUrl;
    this.passwordHash = user.passwordHash;
    this.gender = user.gender;
    this.birthday = user.birthday;
    this.userRole = user.userRole;
    this.location = user.location;
    this.trainingLevel = user.trainingLevel;
    this.trainingTypes = user.trainingTypes;
    this.questionnaire = user.questionnaire;
    this.myFriends = user.myFriends;
    this.myPurchases = user.myPurchases;
    this.myGyms = user.myGyms;
  }
}
