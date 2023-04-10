import {InjectQueue} from '@nestjs/bull';
import {Injectable} from '@nestjs/common';
import {Queue} from 'bull';
import {MAIL_QUEUE} from 'src/app.constant';
import {MailService} from 'src/mail/mail.service';
import {NewTrainingEmailData} from 'src/types/new-training-email-data.interface';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly mailService: MailService,
    @InjectQueue(MAIL_QUEUE) private readonly mailQueue: Queue
  ) {}

  public async runAllQueuedTasks() {
    await this.mailQueue.resume();
  }

  public async addNewTrainingMailSendTask(newTrainingEmailData: NewTrainingEmailData) {
    await this.mailService.addNewTrainingMailSendTask(newTrainingEmailData);
  }
}
