import {Controller} from '@nestjs/common';
import {EventPattern} from '@nestjs/microservices';
import {CommandEvent} from 'src/types/command-event.enum';
import {NewTrainingEmailData} from 'src/types/new-training-email-data.interface';
import {SubscriptionService} from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    private readonly subscriptionService: SubscriptionService
  ) {}

  @EventPattern({cmd: CommandEvent.CreateNewTraining})
  public async sendNewTrainingMail(trainingData: Omit<NewTrainingEmailData, 'sendTo' | 'suscriberName'>) {
    await this.subscriptionService.sendNewTrainingMail({
      ...trainingData,
      sendTo: 'mikhail@mikhail.com',
      suscriberName: 'Mikhail'
    });
  }
}
