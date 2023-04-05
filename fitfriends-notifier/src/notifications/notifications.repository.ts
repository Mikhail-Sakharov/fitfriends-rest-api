import {CRUDRepository} from 'src/types/crud-repository.interface';
import {NotificationsEntity} from './notifications.entity';
import {Notification} from 'src/types/notification.interface';
import {NotificationsModel} from './notifications.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

export class NotificationsRepository implements CRUDRepository<NotificationsEntity, string, Notification> {
  constructor(
    @InjectModel(NotificationsModel.name) private readonly notificationsModel: Model<NotificationsModel>
  ) {}

  public async create(item: NotificationsEntity): Promise<Notification> {
    const newNotification = new this.notificationsModel(item);
    return await newNotification.save();
  }

  public async find(): Promise<Notification[]> {
    return await this.notificationsModel.find();
  }

  public async findById(id: string): Promise<Notification | null> {
    return await this.notificationsModel.findById(id);
  }

  public async update(id: string, item: NotificationsEntity): Promise<Notification> {
    return await this.notificationsModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return await this.notificationsModel.findByIdAndDelete(id);
  }
}
