import {Expose, Type} from 'class-transformer';
import {UserRdo} from './user.rdo';

class Tokens {
  @Expose()
  public accessToken: string;

  @Expose()
  public refreshToken: string;
}

export class LoggedUserRdo {
  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;

  @Expose()
  @Type(() => Tokens)
  public tokens: Tokens;
}
