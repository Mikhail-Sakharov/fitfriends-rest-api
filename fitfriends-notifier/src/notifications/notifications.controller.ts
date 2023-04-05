import {Controller} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from 'src/types/command-event.enum';

type AddFriendDto = {
  addresseeId: string;
  senderId: string;
  senderName: string;
  text: string;
};

@Controller('notifications')
export class NotificationsController {
  // Создание оповещения через приём события от других сервисов
  @EventPattern({cmd: CommandEvent.AddFriend})
  public async registerNewBlogUser(subscriber: AddFriendDto) {
    console.log(subscriber);
  }
  // Список оповещений
  // Удалить оповещение
}
