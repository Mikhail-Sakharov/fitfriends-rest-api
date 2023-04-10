import {Module} from '@nestjs/common';
import {MailService} from './mail.service';
import {MailerModule} from '@nestjs-modules/mailer';
import {getMailConfig} from 'src/config/mail.config';
import {MailProcessor} from './mail.processor';
import {BullModule} from '@nestjs/bull';
import {MAIL_QUEUE} from 'src/app.constant';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailConfig()),
    BullModule.registerQueue({
      name: MAIL_QUEUE
    })
  ],
  providers: [MailService, MailProcessor],
  exports: [MailService]
})
export class MailModule {}
