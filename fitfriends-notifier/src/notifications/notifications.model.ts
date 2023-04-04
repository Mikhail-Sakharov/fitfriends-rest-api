import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Notification} from 'src/types/notification.interface';

@Schema({
  collection: 'fitfriends-notifications',
  timestamps: true
})
export class NotificationsModel extends Document implements Notification {
  @Prop({
    required: true
  })
  public addresseeId: string;

  @Prop({
    required: true
  })
  public senderId: string;

  @Prop({
    required: true
  })
  public text: string;
}

export const NotificationsSchema = SchemaFactory.createForClass(NotificationsModel);
