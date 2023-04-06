import {Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from 'src/types/command-event.enum';
import {NotificationsService} from './notifications.service';
import {AddFriendDto} from 'src/dto/add-friend.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService
  ) {}
  // Создание оповещения через приём события от других сервисов
  @EventPattern({cmd: CommandEvent.AddFriend})
  public async createAddFriendNotification(addFriendData: AddFriendDto) {
    await this.notificationsService.createAddFriendNotification(addFriendData);
  }
  // Обработка события удаления из друзей
  // Список оповещений (может получить только получатель)
  @Get('')
  @HttpCode(HttpStatus.OK)
  public async getNotifications() {
    const notifications = await this.notificationsService.getNotifications();
    return notifications;
  }
  // Удалить оповещение (может удалить только получатель)
}
