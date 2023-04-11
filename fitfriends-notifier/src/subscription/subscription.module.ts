import {Module} from '@nestjs/common';
import {SubscriptionController} from './subscription.controller';
import {SubscriptionService} from './subscription.service';
import {MailModule} from 'src/mail/mail.module';
import {BullModule} from '@nestjs/bull';
import {MAIL_QUEUE} from 'src/app.constant';
import {MongooseModule} from '@nestjs/mongoose';
import {SubscriptionModel, SubscriptionSchema} from './subscription.model';
import {JwtModule} from '@nestjs/jwt';
import {SubscriptionRepository} from './subscription.repository';

@Module({
  imports: [
    MailModule,
    JwtModule.register({}),
    BullModule.registerQueue({
      name: MAIL_QUEUE
    }),
    MongooseModule.forFeature([
      {name: SubscriptionModel.name, schema: SubscriptionSchema}
    ])
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository]
})
export class SubscriptionModule {}
