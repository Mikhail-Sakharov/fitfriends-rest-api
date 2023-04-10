import {MailerService} from "@nestjs-modules/mailer";
import {Process, Processor} from "@nestjs/bull";
import {Injectable, Logger} from "@nestjs/common";
import {Job} from "bull";
import {CREATE_NEW_TRAINING_JOB, MAIL_QUEUE} from 'src/app.constant';
import {NewTrainingEmailData} from 'src/types/new-training-email-data.interface';
import {NEW_TRAINING_EMAIL_SUBJECT} from './mail.constant';

@Injectable()
@Processor(MAIL_QUEUE)
export class MailProcessor {
  private readonly logger = new Logger(MailProcessor.name);

  constructor(
    private readonly mailerService: MailerService
  ) {}

  @Process(CREATE_NEW_TRAINING_JOB)
  public async sendNewTrainingMail(job: Job<NewTrainingEmailData>) {
    this.logger.log(`Sending new training creation event email to '${job.data.sendTo}'`);

    try {
      console.log(job.data);
      this.mailerService.sendMail({
        to: job.data.sendTo,
        subject: NEW_TRAINING_EMAIL_SUBJECT,
        template: '../../../templates/new-training', // решить проблему с путями к шаблонам
        context: {
          user: `${job.data.suscriberName}`,
          coach: `${job.data.coachName}`,
          type: `${job.data.trainingType}`,
          title: `${job.data.trainingTitle}`,
          description: `${job.data.trainingDescription}`,
          gender: `${job.data.trainingGender}`,
          level: `${job.data.trainingLevel}`,
          duration: `${job.data.trainingDuration}`,
          caloriesCount: `${job.data.trainingCaloriesCount}`,
          price: `${job.data.trainingPrice}`
        }
      });
    } catch {
      this.logger.error(`Failed to send new training creation event email to '${job.data.sendTo}'`);
    }
  }
}