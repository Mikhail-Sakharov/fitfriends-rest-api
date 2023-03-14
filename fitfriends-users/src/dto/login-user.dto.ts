import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';

export default class LoginUserDto {
  @IsEmail()
  public email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password!: string;
}
