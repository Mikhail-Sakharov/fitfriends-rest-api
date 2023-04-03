import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {GymsModel, GymsSchema} from './gyms.model';
import {GymsRepository} from './gyms.repository';
import {GymsController} from './gyms.controller';
import {GymsService} from './gyms.service';
import {SeedCommand} from './seed.command';
import {FavoriteGymsModel, FavoriteGymsSchema} from './favorite-gyms.model';
import {FavoriteGymsRepository} from './favorite-gyms.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: GymsModel.name, schema: GymsSchema},
      {name: FavoriteGymsModel.name, schema: FavoriteGymsSchema}
    ])
  ],
  providers: [FavoriteGymsRepository, GymsRepository, GymsService, SeedCommand],
  controllers: [GymsController]
})
export class GymsModule {}
