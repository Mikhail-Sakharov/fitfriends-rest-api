import {Module} from '@nestjs/common';
import {SubscriptionController} from './subscription.controller';
import {SubscriptionService} from './subscription.service';
import {MailModule} from 'src/mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService]
})
export class SubscriptionModule {}
