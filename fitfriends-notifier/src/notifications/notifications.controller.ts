import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from 'src/types/command-event.enum';
import {NotificationsService} from './notifications.service';
import {EventNotificationTextMap} from 'src/types/event-notification-text.map';
import {NotificationDto} from 'src/dto/notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService
  ) {}

  @EventPattern({cmd: CommandEvent.AddFriend})
  public async createAddFriendNotification(notificationData: NotificationDto) {
    await this.notificationsService.createNotification({
      ...notificationData,
      text: `${notificationData.senderName} ${EventNotificationTextMap[CommandEvent.AddFriend]}`
    });
  }

  @EventPattern({cmd: CommandEvent.RemoveFriend})
  public async createRemoveFriendNotification(notificationData: NotificationDto) {
    await this.notificationsService.createNotification({
      ...notificationData,
      text: `${notificationData.senderName} ${EventNotificationTextMap[CommandEvent.RemoveFriend]}`
    });
  }

  @EventPattern({cmd: CommandEvent.TrainingRequest})
  public async createTrainingRequestNotification(notificationData: NotificationDto) {
    await this.notificationsService.createNotification({
      ...notificationData,
      text: `${notificationData.senderName} ${EventNotificationTextMap[CommandEvent.TrainingRequest]}`
    });
  }

  @EventPattern({cmd: CommandEvent.TrainingRequestAcception})
  public async createTrainingRequestAcceptionNotification(notificationData: NotificationDto) {
    await this.notificationsService.createNotification({
      ...notificationData,
      text: `${notificationData.senderName} ${EventNotificationTextMap[CommandEvent.TrainingRequestAcception]}`
    });
  }

  @EventPattern({cmd: CommandEvent.TrainingRequestRejection})
  public async createTrainingRequestRejectionNotification(notificationData: NotificationDto) {
    await this.notificationsService.createNotification({
      ...notificationData,
      text: `${notificationData.senderName} ${EventNotificationTextMap[CommandEvent.TrainingRequestRejection]}`
    });
  }

  // Список оповещений (может получить только получатель)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getNotifications() {
    const notifications = await this.notificationsService.getNotifications();
    return notifications;
  }

  // Удалить оповещение (может удалить только получатель)
}
