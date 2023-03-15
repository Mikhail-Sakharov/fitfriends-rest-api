import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {
  IsArray,
  IsString,
  IsBoolean,
  IsEnum,
  IsInt,
  ArrayMaxSize,
  IsEmail,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested
} from 'class-validator';
import {
  UserNameLength,
  AVATAR_URL_REG_EXP,
  UserPasswordLength,
  BIRTHDAY_REG_EXP,
  MAX_TRAINING_TYPES_LENGTH
} from 'src/app.constant';
import {Duration} from 'src/types/duration.enum';
import {Gender} from 'src/types/gender.enum';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';
import {UserRole} from 'src/types/user-role.enum';
import {User} from 'src/types/user.interface';

class CoachQuestionnaire {
  @IsOptional()
  @IsArray()
  public certificates: string[];

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsBoolean()
  public isReadyToTrain: boolean;
}

class UserQuestionnaire {
  @IsOptional()
  @IsEnum(Duration)
  public trainingDuration: Duration;

  @IsOptional()
  @IsInt()
  public dailyCaloriesCount: number;

  @IsOptional()
  @IsInt()
  public totalCaloriesCount: number;

  @IsOptional()
  @IsBoolean()
  public isReadyToGetTrained: boolean;
}

export type Questionnaire = CoachQuestionnaire | UserQuestionnaire;

export default class UpdateUserDto {
  @ApiProperty({
    description: 'The name of a user',
    example: 'John'
  })
  @IsOptional()
  @MinLength(UserNameLength.MIN)
  @MaxLength(UserNameLength.MAX)
  public userName?: string;

  @ApiProperty({
    description: 'The email of a user',
    example: 'qwe@qwe.qwe'
  })
  @IsOptional()
  @IsEmail()
  public email?: string;

  @ApiProperty({
    description: "The url of the user's avatar file",
    example: 'upload/example.png'
  })
  @IsOptional()
  @IsString()
  @Matches(AVATAR_URL_REG_EXP)
  public avatarUrl?: string;

  @ApiProperty({
    description: "The user's password",
    example: '123456'
  })
  @IsOptional()
  @IsString()
  @MinLength(UserPasswordLength.MIN)
  @MaxLength(UserPasswordLength.MAX)
  public password?: string;

  @ApiProperty({
    description: 'Might be of types: "мужской", "женский" or "неважно"',
    example: 'мужской'
  })
  @IsOptional()
  @IsEnum(Gender)
  public gender?: Gender;

  @ApiProperty({
    description: "The day of a user's birth",
    example: '01.01.2000'
  })
  @IsOptional()
  @Matches(BIRTHDAY_REG_EXP)
  public birthday?: string;

  @ApiProperty({
    description: 'The role of a user',
    example: 'Might be of types: "тренер" or "пользователь"'
  })
  @IsOptional()
  @IsEnum(UserRole)
  public userRole?: UserRole;

  @ApiProperty({
    description: 'The location of a user',
    example:
      'Might be of types: "Пионерская", "Петроградская", "Удельная", "Звёздная" or "Спортивная"'
  })
  @IsOptional()
  @IsEnum(SubwayStation)
  public location?: SubwayStation;

  @ApiProperty({
    description: 'The training level of a user',
    example: 'Might be of types: "новичок", "любитель" or "профессионал"'
  })
  @IsOptional()
  @IsEnum(TrainingLevel)
  public trainingLevel?: TrainingLevel;

  @ApiProperty({
    description: "The list of user's preffered training types",
    example: 'Look the training type enum'
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_TRAINING_TYPES_LENGTH)
  @IsEnum(TrainingType, {each: true})
  public trainingTypes?: TrainingType[];

  @ApiProperty({
    description: 'The set of properties according to the user role',
    example: 'Look the relevant section'
  })
  @IsOptional()
  @ValidateNested()
  @Type(({object}) => {
    switch (object.userRole) {
      case UserRole.User:
        return UserQuestionnaire;
      case UserRole.Coach:
        return CoachQuestionnaire;
    }
  })
  public questionnaire?: Questionnaire;

  public myFriends?: string[];
  public myPurchases?: string[];
  public myGyms?: string[];
  public refreshToken?: string | null;
}
