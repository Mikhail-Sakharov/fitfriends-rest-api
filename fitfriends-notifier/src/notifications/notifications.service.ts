import {Injectable} from '@nestjs/common';
import {NotificationsRepository} from './notifications.repository';
import {NotificationsEntity} from './notifications.entity';
import {NotificationDto} from 'src/dto/notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  public async createNotification(notificationData: NotificationDto & {text: string}) {
    const notificationEntity = new NotificationsEntity(notificationData);
    await this.notificationsRepository.create(notificationEntity);
  }

  public async getNotifications() {
    const notifications = await this.notificationsRepository.find();
    return notifications;
  }
}
