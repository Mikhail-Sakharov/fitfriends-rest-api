import {InjectQueue} from '@nestjs/bull';
import {Injectable, NotFoundException} from '@nestjs/common';
import {Queue} from 'bull';
import {MAIL_QUEUE} from 'src/app.constant';
import {MailService} from 'src/mail/mail.service';
import {NewTrainingEmailData} from 'src/types/new-training-email-data.interface';
import {SubscriptionRepository} from './subscription.repository';
import {Subscriber} from 'src/types/subscriber.interface';
import {SubscriptionEntity} from './subscription.entity';
import {Coach} from 'src/types/coach.interface';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly mailService: MailService,
    @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue
  ) {}

  public async createCoach(coach: Coach) {
    const subscriptionEntity = new SubscriptionEntity(coach);
    await this.subscriptionRepository.create(subscriptionEntity);
  }

  public async toggleSubscriberStatus(coachId: string, newSubscriber: Subscriber) {
    const subscription = await this.subscriptionRepository.findByCoachId(coachId);
    if (!subscription) {
      throw new NotFoundException('The coach with the id is not found');
    }
    const subscribers = subscription.subscribers;
    const isSubscribed = subscribers.find((subscriber) => subscriber.subscriberEmail === newSubscriber.subscriberEmail);
    if (isSubscribed) {
      const updatedSubscribers = [...subscribers].filter((subscriber) => subscriber.subscriberEmail !== newSubscriber.subscriberEmail);
      const subscriptionEntity = new SubscriptionEntity({
        ...subscription,
        subscribers: updatedSubscribers
      });
      await this.subscriptionRepository.update(subscription._id, subscriptionEntity);
      await this.mailService.sendRemoveSubscriberMail({
        sendTo: newSubscriber.subscriberEmail,
        subscriberName: newSubscriber.subscriberName,
        coachName: subscription.coachName
      });
    } else {
      const updatedSubscribers = [...subscribers, newSubscriber];
      const subscriptionEntity = new SubscriptionEntity({
        ...subscription,
        subscribers: updatedSubscribers
      });
      await this.subscriptionRepository.update(subscription._id, subscriptionEntity);
      await this.mailService.sendAddSubscriberMail({
        sendTo: newSubscriber.subscriberEmail,
        subscriberName: newSubscriber.subscriberName,
        coachName: subscription.coachName
      });
    }
  }

  public async runAllQueuedTasks() {
    await this.mailQueue.resume();
  }

  public async addNewTrainingMailSendTask(newTrainingEmailData: Omit<NewTrainingEmailData, 'sendTo' | 'subscriberName'>) {
    await this.mailService.addNewTrainingMailSendTask({
      ...newTrainingEmailData, 
      sendTo: 'mikhail@mikhail.com',
      subscriberName: 'Mikhail'
    });
  }
}
