import {Expose, Transform} from 'class-transformer';

export class NotificationRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public addresseeId: string;

  @Expose()
  public senderId: string;

  @Expose()
  public senderName: string;

  @Expose()
  public text: string;
}
