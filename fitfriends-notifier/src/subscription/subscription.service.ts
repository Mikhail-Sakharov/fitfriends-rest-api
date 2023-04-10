import {Injectable} from '@nestjs/common';
import {MailService} from 'src/mail/mail.service';
import {NewTrainingEmailData} from 'src/types/new-training-email-data.interface';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly mailService: MailService
  ) {}

  public async sendNewTrainingMail(newTrainingEmailData: NewTrainingEmailData) {
    await this.mailService.sendNewTrainingMail(newTrainingEmailData);
  }
}
