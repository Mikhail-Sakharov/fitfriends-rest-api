import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';
import {UserRdo} from './user.rdo';

class Tokens {
  @Expose()
  public accessToken: string;

  @Expose()
  public refreshToken: string;
}

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The user of the application',
    example: 'Look "user.rdo.ts"'
  })
  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;

  @ApiProperty({
    description: 'A pair of the two access & refresh tokens',
    example: 'A usual JWT token of the String type'
  })
  @Expose()
  @Type(() => Tokens)
  public tokens: Tokens;
}
