import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {GymsModel, GymsSchema} from './gyms.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: GymsModel.name, schema: GymsSchema}
    ])
  ]
})
export class GymsModule {}
