import {CRUDRepository} from 'src/types/crud-repository.interface';
import {SubscriptionEntity} from './subscription.entity';
import {Subscription} from 'src/types/subscription.interface';
import {InjectModel} from '@nestjs/mongoose';
import {SubscriptionModel} from './subscription.model';
import {Model} from 'mongoose';

export class SubscriptionRepository implements CRUDRepository<SubscriptionEntity, string, Subscription> {
  constructor(
    @InjectModel(SubscriptionModel.name) private readonly subscriptionModel: Model<SubscriptionModel>
  ) {}

  public async create(item: SubscriptionEntity): Promise<Subscription> {
    const subscription = await this.subscriptionModel.create(item.toObject());
    return subscription;
  }

  public async findByCoachId(coachId: string): Promise<Subscription> {
    return await this.subscriptionModel.findOne({coachId});
  }

  public async findById(id: string): Promise<Subscription> {
    return await this.subscriptionModel.findById(id);
  }

  public async update(id: string, item: SubscriptionEntity): Promise<Subscription> {
    return await this.subscriptionModel.findByIdAndUpdate(id, item.toObject(), {new: true});
  }

  public async destroy(id: string): Promise<void> {
    return await this.subscriptionModel.findByIdAndDelete(id);
  }
}
