import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {GymsModel, GymsSchema} from './gyms.model';
import {GymsRepository} from './gyms.repository';
import {GymsController} from './gyms.controller';
import {GymsService} from './gyms.service';
import {SeedCommand} from './seed.command';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: GymsModel.name, schema: GymsSchema}
    ])
  ],
  providers: [GymsRepository, GymsService, SeedCommand],
  controllers: [GymsController]
})
export class GymsModule {}
