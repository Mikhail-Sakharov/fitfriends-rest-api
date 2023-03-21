import {registerAs} from '@nestjs/config';

export const jwtOptions = registerAs('jwt', () => ({
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
}));
