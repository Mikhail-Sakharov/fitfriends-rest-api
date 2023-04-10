import {SharedBullAsyncConfiguration} from '@nestjs/bull';
import {ConfigModule, ConfigService, registerAs} from '@nestjs/config';
     
export const redisOptions = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
}));
     
export function getBullConfig(): SharedBullAsyncConfiguration {
  return {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      redis: {
        host: configService.get<string>('redis.host'),
        port: configService.get<number>('redis.port'),
      },
    }),
    inject: [ConfigService]
  }
}
