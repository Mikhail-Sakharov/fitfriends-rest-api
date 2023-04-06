import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
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

  public async getNotifications(userId: string) {
    const notifications = await this.notificationsRepository.find(userId);
    return notifications;
  }

  public async deleteNotification(id: string, userId: string) {
    const notification = await this.notificationsRepository.findById(id);
    if (!notification) {
      throw new NotFoundException('Notification with the provided id is not found');
    }
    if (notification.addresseeId !== userId) {
      throw new ForbiddenException('Access denied');
    }
    await this.notificationsRepository.destroy(id);
  }
}
