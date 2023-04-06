import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from 'src/types/command-event.enum';
import {NotificationsService} from './notifications.service';
import {AddFriendDto} from 'src/dto/add-friend.dto';
import {EventNotificationTextMap} from 'src/types/event-notification-text.map';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService
  ) {}
  // Создание оповещения через приём события от других сервисов
  @EventPattern({cmd: CommandEvent.AddFriend})
  public async createAddFriendNotification(addFriendData: AddFriendDto) {
    await this.notificationsService.createAddFriendNotification({
      ...addFriendData,
      text: `${addFriendData.senderName} ${EventNotificationTextMap[CommandEvent.AddFriend]}`
    });
  }

  // Обработка события удаления из друзей

  /* @EventPattern({cmd: CommandEvent.AddFriend})
  public async createTrainingRequestNotification(addFriendData: AddFriendDto) {
    await this.notificationsService.createTrainingRequestNotification(addFriendData);
  } */

  /* @EventPattern({cmd: CommandEvent.AddFriend})
  public async createTrainingRequestAcceptionNotification(addFriendData: AddFriendDto) {
    await this.notificationsService.createTrainingRequestAcceptionNotification(addFriendData);
  } */

  /* @EventPattern({cmd: CommandEvent.AddFriend})
  public async createTrainingRequestRejectionNotification(addFriendData: AddFriendDto) {
    await this.notificationsService.createTrainingRequestRejectionNotification(addFriendData);
  } */

  // Список оповещений (может получить только получатель)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getNotifications() {
    const notifications = await this.notificationsService.getNotifications();
    return notifications;
  }

  // Удалить оповещение (может удалить только получатель)
}
