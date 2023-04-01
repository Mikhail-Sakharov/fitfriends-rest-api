import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {GymFeatures} from 'src/types/gym-features.enum';
import {Gym} from 'src/types/gym.interface';
import {SubwayStation} from 'src/types/subway-station.enum';

@Schema({
  collection: 'fitfriends-gyms',
  timestamps: true
})
export class GymsModel extends Document implements Gym {
  @Prop({
    required: true
  })
  public title: string;

  @Prop({
    required: true
  })
  public location: SubwayStation;

  @Prop({
    default: false
  })
  public isVerified: boolean;

  @Prop({
    required: true
  })
  public features: GymFeatures[];

  @Prop({
    required: true
  })
  public images: string[];

  @Prop({
    required: true
  })
  public description: string;

  @Prop({
    required: true
  })
  public price: number;
}

export const GymsSchema = SchemaFactory.createForClass(GymsModel);
