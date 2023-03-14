import {ApiProperty} from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The name of a user',
    example: 'John'
  })
  @MinLength(UserNameLength.MIN)
  @MaxLength(UserNameLength.MAX)
  public userName!: string;

  @ApiProperty({
    description: 'The email of a user',
    example: 'qwe@qwe.qwe'
  })
  @IsEmail()
  public email!: string;

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
  @IsString()
  @MinLength(UserPasswordLength.MIN)
  @MaxLength(UserPasswordLength.MAX)
  public password!: string;

  @ApiProperty({
    description: 'Might be of types: "мужской", "женский" or "неважно"',
    example: 'мужской'
  })
  @IsEnum(Gender)
  public gender!: Gender;

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
  @IsEnum(UserRole)
  public userRole!: UserRole;

  @ApiProperty({
    description: 'The location of a user',
    example:
      'Might be of types: "Пионерская", "Петроградская", "Удельная", "Звёздная" or "Спортивная"'
  })
  @IsEnum(SubwayStation)
  public location!: SubwayStation;

  @ApiProperty({
    description: 'The training level of a user',
    example: 'Might be of types: "новичок", "любитель" or "профессионал"'
  })
  @IsEnum(TrainingLevel)
  public trainingLevel!: TrainingLevel;

  @ApiProperty({
    description: "The list of user's preffered training types",
    example: 'Look the training type enum'
  })
  @IsArray()
  @ArrayMaxSize(MAX_TRAINING_TYPES_LENGTH)
  @IsEnum(TrainingType, {each: true})
  public trainingTypes!: TrainingType[];

  @ApiProperty({
    description: 'The set of properties according to the user role',
    example: 'Look the relevant section'
  })
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
