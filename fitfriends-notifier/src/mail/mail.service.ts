import {Injectable, Logger} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {ADD_SUBSCRIBER_EMAIL_SUBJECT, REMOVE_SUBSCRIBER_EMAIL_SUBJECT} from './mail.constant';
import {AddSubscriberEmailData} from 'src/types/add-subscriber-email-data.interface';
import {RemoveSubscriberEmailData} from 'src/types/remove-suscriber-email-data.interface';
import {NewTrainingEmailData} from 'src/types/new-training-email-data.interface';
import {InjectQueue} from '@nestjs/bull';
import {CREATE_NEW_TRAINING_JOB, MAIL_QUEUE} from 'src/app.constant';
import {Queue} from 'bull';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name)

  constructor(
    private readonly mailerService: MailerService,
    @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue
  ) {}

  public async sendAddSubscriberMail(addSubscriberEmailData: AddSubscriberEmailData) {
    await this.mailerService.sendMail({
      to: addSubscriberEmailData.sendTo,
      subject: ADD_SUBSCRIBER_EMAIL_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${addSubscriberEmailData.suscriberName}`,
        coach: `${addSubscriberEmailData.coachName}`
      }
    })
  }

  public async sendRemoveSubscriberMail(removeSubscriberEmailData: RemoveSubscriberEmailData) {
    await this.mailerService.sendMail({
      to: removeSubscriberEmailData.sendTo,
      subject: REMOVE_SUBSCRIBER_EMAIL_SUBJECT,
      template: './remove-subscriber',
      context: {
        user: `${removeSubscriberEmailData.suscriberName}`,
        coach: `${removeSubscriberEmailData.coachName}`
      }
    })
  }

  public async sendNewTrainingMail(newTrainingEmailData: NewTrainingEmailData): Promise<void> {
    try {
      // await this.mailQueue.pause();
      // await this.mailQueue.resume();
      await this.mailQueue.add(CREATE_NEW_TRAINING_JOB, newTrainingEmailData);
    } catch (error) {
      this.logger.error(`Error queueing email to user ${newTrainingEmailData.sendTo}`);

      throw error;
    }
  }
}
