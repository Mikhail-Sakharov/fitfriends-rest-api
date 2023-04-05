import {Entity} from 'src/types/entity.interface';
import {Notification} from 'src/types/notification.interface';

export class NotificationsEntity implements Notification, Entity<Notification> {
  public addresseeId: string;
  public senderId: string;
  public senderName: string;
  public text: string;

  constructor(notification: Notification) {
    this.fillEntity(notification);
  }

  toObject(): Notification {
    return {...this};
  }

  fillEntity(notification: Notification) {
    this.addresseeId = notification.addresseeId;
    this.senderId = notification.senderId;
    this.senderName = notification.senderName;
    this.text = notification.text;
  }
}
