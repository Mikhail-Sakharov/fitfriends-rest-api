import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';

export default class LoginUserDto {
  @ApiProperty({
    description: 'The email of a user',
    example: 'qwe@qwe.qwe'
  })
  @IsEmail()
  public email!: string;

  @ApiProperty({
    description: "The user's password",
    example: '123456'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password!: string;
}
