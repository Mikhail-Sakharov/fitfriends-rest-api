import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {ADD_SUBSCRIBER_EMAIL_SUBJECT, REMOVE_SUBSCRIBER_EMAIL_SUBJECT} from './mail.constant';
import {AddSubscriberEmailData} from 'src/types/add-subscriber-email-data.interface';
import {RemoveSubscriberEmailData} from 'src/types/remove-suscriber-email-data.interface';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService
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
}
