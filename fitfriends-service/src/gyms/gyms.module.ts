import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {GymsModel, GymsSchema} from './gyms.model';
import {GymsRepository} from './gyms.repository';
import {GymsController} from './gyms.controller';
import {GymsService} from './gyms.service';
import {SeedCommand} from './seed.command';
import {FavoriteGymsModel, FavoriteGymsSchema} from './favorite-gyms.model';
import {FavoriteGymsRepository} from './favorite-gyms.repository';
import {JwtModule} from '@nestjs/jwt';
import {AccessTokenStrategy} from 'src/strategies/access-token.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {name: GymsModel.name, schema: GymsSchema},
      {name: FavoriteGymsModel.name, schema: FavoriteGymsSchema}
    ])
  ],
  providers: [FavoriteGymsRepository, GymsRepository, GymsService, SeedCommand, AccessTokenStrategy],
  controllers: [GymsController]
})
export class GymsModule {}
