import {Controller, Delete, Get, HttpCode, HttpStatus, Param, RawBodyRequest, Req, UseGuards} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from 'src/types/command-event.enum';
import {NotificationsService} from './notifications.service';
import {EventNotificationTextMap} from 'src/types/event-notification-text.map';
import {NotificationDto} from 'src/dto/notification.dto';
import {AccessTokenGuard} from 'src/guards/access-token.guard';
import {Payload} from 'src/types/payload.interface';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService
  ) {}

  // СОЗДАНИЕ ОПОВЕЩЕНИЯ ПРИ ДОБАВЛЕНИИ В ДРУЗЬЯ
  @EventPattern({cmd: CommandEvent.AddFriend})
  public async createAddFriendNotification(notificationData: NotificationDto) {
    await this.notificationsService.createNotification({
      ...notificationData,
      text: `${notificationData.senderName} ${EventNotificationTextMap[CommandEvent.AddFriend]}`
    });
  }

  // СОЗДАНИЕ ОПОВЕЩЕНИЯ ПРИ УДАЛЕНИИ ИЗ ДРУЗЕЙ
  @EventPattern({cmd: CommandEvent.RemoveFriend})
  public async createRemoveFriendNotification(notificationData: NotificationDto) {
    await this.notificationsService.createNotification({
      ...notificationData,
      text: `${notificationData.senderName} ${EventNotificationTextMap[CommandEvent.RemoveFriend]}`
    });
  }

  // СОЗДАНИЕ ОПОВЕЩЕНИЯ ПРИ ЗАПРОСЕ НА ТРЕНИРОВКУ
  @EventPattern({cmd: CommandEvent.TrainingRequest})
  public async createTrainingRequestNotification(notificationData: NotificationDto) {
    await this.notificationsService.createNotification({
      ...notificationData,
      text: `${notificationData.senderName} ${EventNotificationTextMap[CommandEvent.TrainingRequest]}`
    });
  }

  // СОЗДАНИЕ ОПОВЕЩЕНИЯ ПРИ ПРИНЯТИИ ЗАПРОСА НА ТРЕНИРОВКУ
  @EventPattern({cmd: CommandEvent.TrainingRequestAcception})
  public async createTrainingRequestAcceptionNotification(notificationData: NotificationDto) {
    await this.notificationsService.createNotification({
      ...notificationData,
      text: `${notificationData.senderName} ${EventNotificationTextMap[CommandEvent.TrainingRequestAcception]}`
    });
  }

  // СОЗДАНИЕ ОПОВЕЩЕНИЯ ПРИ ОТКЛОНЕНИ ЗАПРОСА НА ТРЕНИРОВКУ
  @EventPattern({cmd: CommandEvent.TrainingRequestRejection})
  public async createTrainingRequestRejectionNotification(notificationData: NotificationDto) {
    await this.notificationsService.createNotification({
      ...notificationData,
      text: `${notificationData.senderName} ${EventNotificationTextMap[CommandEvent.TrainingRequestRejection]}`
    });
  }

  // СПИСОК ОПОВЕЩЕНИЙ
  @UseGuards(AccessTokenGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getNotifications(
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const userId = req.user.sub;
    const notifications = await this.notificationsService.getNotifications(userId);
    return notifications;
  }

  // УДАЛЕНИЕ ОПОВЕЩЕНИЯ
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async deleteNotification(
    @Param('id') id: string,
    @Req() req: RawBodyRequest<{user: Payload}>
  ) {
    const userId = req.user.sub;
    await this.notificationsService.deleteNotification(id, userId);
  }
}
