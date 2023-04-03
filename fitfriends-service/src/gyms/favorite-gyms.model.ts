import {Document, Schema as MongooseSchema} from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {FavoriteGym} from 'src/types/favorite-gym.interface';

@Schema({
  collection: 'fitfriends-favorite-gyms',
  timestamps: true
})
export class FavoriteGymsModel extends Document implements FavoriteGym {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'GymsModel',
    required: true
  })
  gymId: string;

  @Prop({
    required: true
  })
  userId: string;  
}

export const FavoriteGymsSchema = SchemaFactory.createForClass(FavoriteGymsModel);
