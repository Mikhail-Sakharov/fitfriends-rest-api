import {Injectable} from '@nestjs/common';
import {NotificationsRepository} from './notifications.repository';
import {AddFriendDto} from 'src/dto/add-friend.dto';
import {NotificationsEntity} from './notifications.entity';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository
  ) {}

  public async createAddFriendNotification(addFriendData: AddFriendDto & {text: string}) {
    const notificationEntity = new NotificationsEntity(addFriendData);
    await this.notificationsRepository.create(notificationEntity);
  }

  public async getNotifications() {
    const notifications = await this.notificationsRepository.find();
    return notifications;
  }
}
