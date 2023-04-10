import {Module} from '@nestjs/common';
import {SubscriptionController} from './subscription.controller';
import {SubscriptionService} from './subscription.service';
import {MailModule} from 'src/mail/mail.module';
import {BullModule} from '@nestjs/bull';
import {MAIL_QUEUE} from 'src/app.constant';

@Module({
  imports: [
    MailModule,
    BullModule.registerQueue({
      name: MAIL_QUEUE
    })
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService]
})
export class SubscriptionModule {}
