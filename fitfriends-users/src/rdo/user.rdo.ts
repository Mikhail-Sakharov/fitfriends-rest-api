import {ApiProperty} from '@nestjs/swagger';
import {Transform, Expose} from 'class-transformer';
import {Gender} from 'src/types/gender.enum';
import {SubwayStation} from 'src/types/subway-station.enum';
import {TrainingLevel} from 'src/types/training-level.enum';
import {TrainingType} from 'src/types/training-type.enum';
import {UserRole} from 'src/types/user-role.enum';
import {User} from 'src/types/user.interface';
import {Questionnaire} from '../dto/create-user.dto';

export class UserRdo {
  @ApiProperty({
    description: 'The unique MongoDB ID',
    example: '6410a7b666d4c557792f0382'
  })
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'The date of a user entry creation',
    example: '2023-03-14T16:58:30.805Z'
  })
  @Expose()
  public createdAt: string[];

  @ApiProperty({
    description: 'The name of a user',
    example: 'John'
  })
  @Expose()
  public userName: string;

  @ApiProperty({
    description: 'The email of a user',
    example: 'qwe@qwe.qwe'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: "The url of the user's avatar file",
    example: 'upload/example.png'
  })
  @Expose()
  public avatarUrl: string;

  @ApiProperty({
    description: 'Might be of types: "мужской", "женский" or "неважно"',
    example: 'мужской'
  })
  @Expose()
  public gender: Gender;

  @ApiProperty({
    description: "The day of a user's birth",
    example: '01.01.2000'
  })
  @Expose()
  public birthday: string;

  @ApiProperty({
    description: 'The role of a user',
    example: 'Might be of types: "тренер" or "пользователь"'
  })
  @Expose()
  public userRole: UserRole;

  @ApiProperty({
    description: 'The location of a user',
    example:
      'Might be of types: "Пионерская", "Петроградская", "Удельная", "Звёздная" or "Спортивная"'
  })
  @Expose()
  public location: SubwayStation;

  @ApiProperty({
    description: 'The training level of a user',
    example: 'Might be of types: "новичок", "любитель" or "профессионал"'
  })
  @Expose()
  public trainingLevel: TrainingLevel;

  @ApiProperty({
    description: "The list of user's preffered training types",
    example: 'Look the training type enum'
  })
  @Expose()
  public trainingTypes: TrainingType[];

  @ApiProperty({
    description: 'The set of properties according to the user role',
    example: 'Look the relevant section'
  })
  @Expose()
  public questionnaire: Questionnaire;

  @ApiProperty({
    description: 'The list of friends ids',
    example: '[6410a7b666d4c557792f0383, 6410a7b666d4c557792f0385]'
  })
  @Expose()
  public myFriends: User[];

  @ApiProperty({
    description: 'The list of purchases ids',
    example: '[6410a7b666d4c557792f0383, 6410a7b666d4c557792f0385]'
  })
  @Expose()
  public myPurchases: string[];

  @ApiProperty({
    description: 'The list of gyms ids',
    example: '[6410a7b666d4c557792f0383, 6410a7b666d4c557792f0385]'
  })
  @Expose()
  public myGyms: string[];
}
