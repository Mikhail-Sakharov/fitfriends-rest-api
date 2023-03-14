import {Type} from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested
} from 'class-validator';
import {
  AVATAR_URL_REG_EXP,
  BIRTHDAY_REG_EXP,
  MAX_TRAINING_TYPES_LENGTH,
  UserNameLength,
  UserPasswordLength
} from 'src/app.constant';
import {Duration} from 'src/types/duration.enum';
import {Gender} from 'src/types/gender.enum';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';
import {UserRole} from 'src/types/user-role.enum';

class CoachQuestionnaire {
  @IsArray()
  public certificates!: string[];

  @IsString()
  public description!: string;

  @IsBoolean()
  public isReadyToTrain!: boolean;
}

class UserQuestionnaire {
  @IsEnum(Duration)
  public trainingDuration!: Duration;

  @IsInt()
  public dailyCaloriesCount!: number;

  @IsInt()
  public totalCaloriesCount!: number;

  @IsBoolean()
  public isReadyToGetTrained!: boolean;
}

export type Questionnaire = CoachQuestionnaire | UserQuestionnaire;

export default class CreateUserDto {
  @MinLength(UserNameLength.MIN)
  @MaxLength(UserNameLength.MAX)
  public userName!: string;

  @IsEmail()
  public email!: string;

  @IsOptional()
  @IsString()
  @Matches(AVATAR_URL_REG_EXP)
  public avatarUrl?: string;

  @IsString()
  @MinLength(UserPasswordLength.MIN)
  @MaxLength(UserPasswordLength.MAX)
  public password!: string;
  public gender!: Gender;

  @IsOptional()
  @Matches(BIRTHDAY_REG_EXP)
  public birthday?: string;

  @IsEnum(UserRole)
  public userRole!: UserRole;

  @IsEnum(SubwayStation)
  public location!: SubwayStation;

  @IsEnum(TrainingLevel)
  public trainingLevel!: TrainingLevel;

  @IsArray()
  @ArrayMaxSize(MAX_TRAINING_TYPES_LENGTH)
  @IsEnum(TrainingType, {each: true})
  public trainingTypes!: TrainingType[];

  @ValidateNested()
  @Type(({object}) => {
    switch (object.userRole) {
      case UserRole.User:
        return UserQuestionnaire;
      case UserRole.Coach:
        return CoachQuestionnaire;
    }
  })
  public questionnaire!: Questionnaire;
}
